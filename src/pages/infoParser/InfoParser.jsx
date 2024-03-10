import classes from "./InfoParser.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import CheckboxCard from "../../components/ui/checkboxCard/CheckboxCard"
import { useRef, useState } from "react"
import { useGetParserContent } from "../../api/parser/queries"
import { useParams } from "react-router-dom"
import ReactButton from "../../components/ui/reactButton/ReactButton"
import Notfound from "../../components/notfound/Notfound"
export default function InfoParser() {

    const {id} = useParams()
    const {data: parserContentData, isLoading: parserContentLoading} = useGetParserContent(id)
    const [selected, setSelected] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    const refList = useRef()

    
    const handleSelected = (gItem) => {
        const isExist = selected.map(item => item.participant_id).indexOf(gItem.participant_id)
        if (isExist === -1) {
            setSelected(curr => [...curr, gItem])
        }
        else {
            setSelected(selected.filter(item => item.participant_id !== gItem.participant_id))
        }
    }

    const handleSelectAll = () => {
        if(parserContentData?.data.participants.length > 0){
            setAllSelected(!allSelected)
            const arrListItems = refList.current.childNodes
            const arr = []
            arrListItems.forEach(item => {
                arr.push(item.children[0].children[0])
            })
            arr.forEach(item => {
                setTimeout(() => {
                    item.click()
                }, 10)
            })
        }
         else{
            alert("Ничего нет!")
        }
    }

    const handleShow = () => {
        alert(selected)
    }

    return (
        <div className={classes.flexing}>
            <h2 className={classes.parsingNumber}>Результаты парсинга №{parserContentData?.data.parsing_result_id}</h2>

            <div className={`${classes.toolsKit} flex`}>
                <ReturnPage />
            </div>
            <div className={classes.parser}>

                <div className={classes.parserCheckboxBox}>
                    <h2 className={`${classes.parserTitle} flex`}>Выбранные пользователи: <p onClick={handleSelectAll}>выбрать все</p></h2>
                        {parserContentLoading && <div>Загрузка данных c сервера... Пожалуйста, подождите некторое время...</div>}
                    <ul ref={refList} className={classes.parserContent}>
                        {
                            
                            parserContentData?.data.participants.length !== 0 ? 
                            parserContentData?.data.participants.map(item => (
                                <li key={item.participant_id}>
                                    <CheckboxCard content={item.full_name} customClickEvent={() => handleSelected(item)} checkboxId={item.participant_id} />
                                </li>
                            ))
                            :
                            <Notfound link={"/nih/parsing-launcher"} content={"Запустите парсер"}/>
                            
                        }
                    </ul>
                </div>
                <div className={`${classes.parserAgree} flex`}>
                    <p>Мы проанализировали, мы можем получить {selected?.length} из {parserContentData?.data.participants.length} участников</p>
                    <div onClick={handleShow}><ReactButton disabled={selected.length === 0 ? true : false} className={classes.buttonStyle} content={"OK"} /></div>
                </div>
            </div>
        </div>
    )
}
