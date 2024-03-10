import { useEffect, useState } from 'react'
import classes from "./ParsingLauncher.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import parsingLauncherData from "../../components/utils/parser"
import CheckboxCard from '../../components/ui/checkboxCard/CheckboxCard'
import sort from "../../assets/images/sort.svg"
import Textarea from '../../components/ui/textarea/Textarea'
import ReactButton from '../../components/ui/reactButton/ReactButton'
import { useManualParserLaunch } from '../../api/parser/queries'
// import Cookies from 'js-cookie'
import FilterParser from '../../components/filterParser/FilterParser.jsx'
import { useNavigate } from 'react-router-dom'

export default function ParsingLauncher() {

   /*  const options = [
        { value: "by_subs", label: "Сортировать по кол-ву подписчиков" },
    ] */
    const nav = useNavigate()
    const [search, setSearch] = useState("")
    const [textareaChannels, setTextareaChannels] = useState("")
    const [textareaGroups, setTextareaGroups] = useState("")
    const {mutate: mutateManualLaunch, isPending: mutateManualLaunchPending, isError: mutateManualLaunchError, isSuccess: mutateManualLaunchSuccess} = useManualParserLaunch()
    const [filterAutoParsing, setFilterAutoParsing] = useState(false)
    const [selected, setSelected] = useState([])
    
    const handleSelected = (id) => {
        if (selected.indexOf(id) === -1) {
            setSelected(curr => [...curr, id])
        }
        else {
            const data = selected.filter(item => item !== id)
            setSelected(data)
        }
    }

    const handleParsingLauncher = async () => {
        console.log('parser start')
        if(textareaChannels.trim() === "" && textareaGroups.trim() === ""){
            alert("Заполните хотябы одну из строк")
            return
        }
        console.log(textareaChannels, textareaGroups)
        const dataChannels = textareaChannels.length ? textareaChannels.split(",") : []
        const dataGroups = textareaGroups.length ? textareaGroups.split(",") : []
        if(textareaChannels.length){
            for(let i = 0; i < dataChannels.length; i++){
                dataChannels[i] = dataChannels[i].trim()
            }
        }
        if(textareaGroups.length){
            for(let i = 0; i < dataGroups.length; i++){
                dataGroups[i] = dataGroups[i].trim()
            }
        }
        const postData = {
            channel_ids: dataChannels,
            group_ids: dataGroups
        }


        mutateManualLaunch(postData)
        console.log("parser end")
    }

    useEffect(() => {
        if(mutateManualLaunchSuccess){
            nav("/nih/parser")
        }
    }, [mutateManualLaunchSuccess])


    return (
        <div className={classes.flexing}>
            {
                filterAutoParsing && (
                    <div onClick={() => setFilterAutoParsing(false)} className="overlay"></div>
                )
            }
            <div className={`${classes.toolsPanel} flex`}>
                <div className={`${classes.toolsKit} flex`}>
                    <ReturnPage />
                </div>
            </div>
            <div className={classes.parser}>
                <div className={classes.autoParsing}>
                    <h2 className={classes.parserTitle}>Авто</h2>
                    <div className={`${classes.toolBox} flex`}>
                        <div className={classes.search}>
                            <SearchInput data={search} setData={setSearch} placeholder={"Поиск по ключевому слову"} />
                        </div>
                        <div onClick={() => setFilterAutoParsing(true)} className={`${classes.sort} flex`}>
                            {
                                filterAutoParsing && (
                                    <FilterParser />
                                )
                            }
                            <img src={sort} alt="sorting by subs" />
                            <p>Сортировать по кол-ву подписчиков</p>
                        </div>
                    </div>
                    <ul className={classes.parserContent}>
                        {
                            parsingLauncherData.map(item => (
                                <li key={item.id}>
                                    <CheckboxCard content={"Иван Иванов Иванович"} customClickEvent={() => handleSelected(item.id)} checkboxId={item.id} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={classes.manualParsing}>
                    <h2 className={classes.parserTitle}>Ручной</h2>
                    <div>
                        <Textarea row={window.innerWidth >= 1350 ? 5 : 4} data={textareaChannels} setData={setTextareaChannels} placeholder={"Введите ссылки на каналы через запятую"} />
                    </div>
                    <div className={classes.groupTextarea}>
                        <Textarea row={window.innerWidth >= 1350 ? 4 : 3} data={textareaGroups} setData={setTextareaGroups} placeholder={"Введите ссылки на группы через запятую"} />
                    </div>
                    <div onClick={handleParsingLauncher} className={classes.buttonLaunch}>
                        <ReactButton disabled={mutateManualLaunchPending} content={mutateManualLaunchPending ? "Parsing..." : mutateManualLaunchError ? "Failed" : "Запуск"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
