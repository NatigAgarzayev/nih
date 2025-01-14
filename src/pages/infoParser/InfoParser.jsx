import classes from "./InfoParser.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import CheckboxCard from "../../components/ui/checkboxCard/CheckboxCard"
import { useEffect, useRef, useState } from "react"
import { useGetParserContent, useGetParsingStatus } from "../../api/parser/queries"
import { useParams } from "react-router-dom"
import ReactButton from "../../components/ui/reactButton/ReactButton"
import Notfound from "../../components/notfound/Notfound"
import { useCreateNewsletter } from "../../api/mailing/queries"
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import ServerError from "../../components/serverError/ServerError"
export default function InfoParser() {
    const [dataSet, setDataSet] = useState([])
    const {id} = useParams()
    const {data: parsingStatusData} = useGetParsingStatus(id)
    const {data: parserContentData, isLoading: parserContentLoading, isError: parserContentError} = useGetParserContent(id)
    const [selected, setSelected] = useState([])
    const [lastIndex, setLastIndex] = useState(0)
    const [allSelected, setAllSelected] = useState(
        {
            selectAll: true,
            removeAll: false,
        }
    )
    const refList = useRef()
    const {mutate: createNewsletterMutate, isPending: createNewsletterPending} = useCreateNewsletter()

    useEffect(() => {
        parserContentData?.participants.forEach(item => {
            item.checked = false
        })
        setDataSet(parserContentData?.participants)
    }, [parserContentData])

    const handleSelected = (gItem, index) => {
        setLastIndex(index)
        
        const isExist = selected.indexOf(gItem.participant_id)
        if (isExist === -1) {
            if(dataSet[index]?.checked === false){
                dataSet[index].checked = true
                setSelected(curr => [...curr, gItem.participant_id])
            }
        }
        else {
            if(dataSet[index]?.checked === true){
                dataSet[index].checked = false
                setSelected(selected.filter(item => item !== gItem.participant_id))
            }
        }
    }

    const handleKeydown = (e, index) => {
        if (e.shiftKey && e.button == 0) {
            const isFirstChecked = selected.length === 0 ? false : selected[0].checked
            if(lastIndex < index){
                for(let i = lastIndex === 0 && !isFirstChecked ? lastIndex : lastIndex + 1; i < index; i++){
                    handleSelected(dataSet[i], i)
                }
                setLastIndex(index + 1)
            }
            if(lastIndex > index){
                for(let i = lastIndex - 1; i > index; i--){
                    handleSelected(dataSet[i], i)
                }
                setLastIndex(lastIndex)
            }
        }
    }

    const handleSelectAll = () => {
        if(allSelected.selectAll === true && allSelected.removeAll === false){
            setAllSelected( {
                selectAll: false,
                removeAll: true,
            })
        }
        else if(allSelected.selectAll === false && allSelected.removeAll === true){
            setAllSelected( {
                selectAll: true,
                removeAll: false,
            })
        }
        if(allSelected.removeAll === true){
            setSelected([])
            dataSet.forEach((item) => {
                item.checked = false
            })
            setLastIndex(0)
        }
        else{
            setSelected([])
            dataSet.forEach((item) => {
                item.checked = false
            })
            dataSet.forEach((item, index) => {
                handleSelected(item, index)
            })
        }
    }

    const handleCreateNewsletter = () => {
        createNewsletterMutate({
            participant_ids: selected,
        })
    }
    return (
        <div className={classes.flexing}>
            <h2 className={classes.parsingNumber}>Результаты парсинга №{parserContentData?.parsing_result_id}</h2>

            <div className={`${classes.toolsKit} flex`}>
                <ReturnPage />
            </div>
            <div className={classes.parser}>

                <div className={classes.parserCheckboxBox}>
                    <h2 className={`${classes.parserTitle} flex`}>Выбранные пользователи: <p onClick={handleSelectAll}>выбрать все</p></h2>
                    <ul ref={refList} className={classes.parserContent}>
                        {
                            dataSet?.length !== 0 ? 
                            parserContentLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                            parserContentError ? <ServerError /> :
                            dataSet?.map((item, index) => (
                                <li onKeyDown={(e) => handleKeydown(e, index)} onMouseDown={(e) => handleKeydown(e, index)} key={item.participant_id}>
                                    <CheckboxCard checked={item?.checked} content={item.full_name} customClickEvent={() => handleSelected(item, index)} checkboxId={item.participant_id} />
                                </li>
                            ))
                            :
                            parsingStatusData?.status === "REQUESTED" || parsingStatusData?.status === "IN_PROGRESS" ?
                                <Notfound title={"Идет парсинг..."} link={"/nih/parser"} content={"Назад"}/>
                                :
                                parsingStatusData?.status === "FAILED" ? 
                                <Notfound title={"Ошибка парсинга"} link={"/nih/parsing-launcher"} content={"Запустите снова"}/>
                                :
                                <Notfound link={"/nih/parsing-launcher"} content={"Запустите парсер"}/>
                        }
                    </ul>
                </div>
                <div className={`${classes.parserAgree} flex`}>
                    <p>Мы проанализировали, мы можем получить {selected?.length} из {dataSet?.length} участников</p>
                    <div onClick={handleCreateNewsletter}><ReactButton disabled={createNewsletterPending || selected.length === 0 ? true : false} className={classes.buttonStyle} content={createNewsletterPending ? "Создание расслыки.." : "OK"} /></div>
                </div>
            </div>
        </div>
    )
}
