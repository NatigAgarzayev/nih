import { useEffect, useState } from 'react'
import classes from "./ParsingLauncher.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import CheckboxCard from '../../components/ui/checkboxCard/CheckboxCard'
import sort from "../../assets/images/sort.svg"
import Textarea from '../../components/ui/textarea/Textarea'
import ReactButton from '../../components/ui/reactButton/ReactButton'
import { useGetAutoParserContent, useManualParserLaunch } from '../../api/parser/queries'
import FilterParser from '../../components/filterParser/FilterParser.jsx'
import { useNavigate } from 'react-router-dom'
import Notfound from '../../components/notfound/Notfound.jsx'
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import ServerError from '../../components/serverError/ServerError.jsx'

export default function ParsingLauncher() {
    const nav = useNavigate()
    const [search, setSearch] = useState("")
    const [allData, setAllData] = useState([])
    const [autoParserDataSet, setAutoParserDataSet] = useState([])
    const [textareaChannels, setTextareaChannels] = useState("")
    const [textareaGroups, setTextareaGroups] = useState("")
    const {mutate: mutateManualLaunch, isPending: mutateManualLaunchPending, isError: mutateManualLaunchError, isSuccess: mutateManualLaunchSuccess} = useManualParserLaunch()
    const {data: autoParserData, isLoading: autoParserLoading, refetch: autoParserRefetch, isError: autoParserError} = useGetAutoParserContent()
    const [filterAutoParsing, setFilterAutoParsing] = useState(false)
    const [selected, setSelected] = useState([])
    const [faze, setFaze] = useState("manual")
    const [filterData, setFilterData] = useState({by_category: '', by_lang: '', by_red_mark: false, by_scam_fake: false, by_subs_begin: "", by_subs_end: ""})

    useEffect(() => {
        setAutoParserDataSet(autoParserData?.participant_sources)
        setAllData(autoParserData?.participant_sources)
    }, [autoParserData])

    useEffect(() => {
        let sortArr = allData
        if(filterData?.by_category !== ""){
            sortArr = sortArr.filter(item => item.category_id === +filterData.by_category)
        }
        if(filterData?.by_lang !== ""){
            sortArr = sortArr.filter(item => item.language_id === +filterData.by_lang)
        }
        if(filterData?.by_red_mark === true){
            sortArr = sortArr.filter(item => item.red_label === false)
        }
        if(filterData?.by_scam_fake === true){
            sortArr = sortArr.filter(item => item.black_label === false)
        }
        if(filterData?.by_subs_begin !== ""){
            sortArr = sortArr.filter(item => item.subscribers_amount >= +filterData.by_subs_begin)
        }
        if(filterData?.by_subs_end !== ""){
            sortArr = sortArr.filter(item => item.subscribers_amount <= +filterData.by_subs_end)
        }
        setAutoParserDataSet(sortArr)
    }, [filterData])

    useEffect(() => {
        autoParserRefetch()
        setAutoParserDataSet(autoParserData?.participant_sources)
        setAllData(autoParserData?.participant_sources)
    }, [])
    
    const handleSelected = (gItem) => {
        setFaze("auto")
        let isExist = false
        for(let i = 0; i < selected.length; i++){
            console.log("gItem.identity = ", gItem.identity)
            if(selected[i].identity === gItem.identity){
                isExist = true
                break
            }
        }
        if (!isExist) {
            setSelected(curr => [...curr, gItem])
        }
        else {
            setSelected(selected.filter(item => item !== gItem))
        }

        if(selected.length === 0){
            setFaze("manual")
        }
    }

    const handleParsingLauncher = async () => {
        if(selected.length === 0){
            if(textareaChannels.trim() === "" && textareaGroups.trim() === ""){
                alert("Заполните хотябы одну из строк")
                return
            }
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
        }
        else if(selected.length > 0){
            let dataChannels = selected.filter(item => item.type === "CHANNEL")
            let dataGroups = selected.filter(item => item.type === "GROUP")
            if(dataChannels.length){
                for(let i = 0; i < dataChannels.length; i++){
                    dataChannels[i] = dataChannels[i].identity.trim()
                }
                dataChannels
            }
            if(dataGroups.length){
                for(let i = 0; i < dataGroups.length; i++){
                    dataGroups[i] = dataGroups[i].identity.trim()
                }
            }
            const postData = {
                channel_ids: dataChannels,
                group_ids: dataGroups
            }
            mutateManualLaunch(postData)
        }
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
                                    <FilterParser setFilterData={setFilterData} setOpened={setFilterAutoParsing} />
                                )
                            }
                            <img src={sort} alt="sorting by subs" />
                            <p>Фильтр парсинга</p>
                        </div>
                    </div>
                    <ul className={classes.parserContent}>
                        {
                            autoParserDataSet?.length !== 0 ? 
                            autoParserLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                            autoParserError ? <ServerError/> :
                            autoParserDataSet
                            ?.filter(item => item.about.toLowerCase().includes(search.toLowerCase()))
                            .map(item => (
                                <li key={item.participant_source_id}>
                                    <CheckboxCard subsAmount={item.subscribers_amount} content={item.identity} customClickEvent={() => handleSelected(item)} checkboxId={item.participant_source_id} />
                                </li>
                            ))
                            :
                            <Notfound content={"Нет данных"}/>
                        }
                    </ul>
                </div>
                <div className={classes.manualParsing}>
                    <h2 className={classes.parserTitle}>Ручной</h2>
                    <div className={classes.cahnnelTextarea}>
                        <Textarea disabled={selected.length > 0} row={window.innerWidth >= 1350 ? 5 : 4} data={textareaChannels} setData={setTextareaChannels} placeholder={"Введите ссылки на каналы через запятую"} />
                    </div>
                    <div className={classes.groupTextarea}>
                        <Textarea disabled={selected.length > 0} row={window.innerWidth >= 1350 ? 4 : 3} data={textareaGroups} setData={setTextareaGroups} placeholder={"Введите ссылки на группы через запятую"} />
                    </div>
                    <div onClick={handleParsingLauncher} className={classes.buttonLaunch}>
                        <ReactButton isError={mutateManualLaunchError} disabled={mutateManualLaunchPending} content={mutateManualLaunchPending ? "Создание задачи..." : mutateManualLaunchError ? "Попробуйте снова" : "Запуск"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
