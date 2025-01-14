import { useEffect, useState } from 'react'
import classes from "./Parser.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import { useGetParsingResults, useRemoveParsing } from '../../api/parser/queries'
import Moment from 'react-moment'
import ReactButton from '../../components/ui/reactButton/ReactButton'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Notfound from '../../components/notfound/Notfound'
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import deleteIcon from "../../assets/images/delete.svg"
import ServerError from "../../components/serverError/ServerError.jsx"

export default function Parser() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [deletedItemId, setDeletedItemId] = useState()
    const nav = useNavigate()
    
    const options = [
        { value: "by_source", label: "Сортировать по источнику" },
        { value: "by_date", label: "Сортировать по дате" },
        { value: "by_status", label: "Сортировать по статусу" },
    ]

    const {data: resultParsingData, isLoading: resultParsingLoading, isError: resultParsingError} = useGetParsingResults()
    const {mutate: removeParsingMutate, isPending: removeParsingPending} = useRemoveParsing()
    const [dataSet, setDataSet] = useState([])

    const [search, setSearch] = useState("")
    const [option, setOption] = useState() // chosen option from Select

    const handleParserResultInfo = (id) => {
        nav(`/nih/info-parser/${id}`)
    }

    useEffect(() => {
        setDataSet(resultParsingData?.parsing_results)
    }, [resultParsingData])

    useEffect(() => {
        if(dataSet?.length > 0){
            const sortParam = searchParams.get("sort")
            if(sortParam){
                setOption(sortParam)
            }
            else{
                setOption("by_date")
                setSearchParams({sort: "by_date"})
            }
        }
    }, [dataSet])

    useEffect(() => {
        if(dataSet?.length > 0){
            if(option === "by_source"){
                setDataSet([...dataSet].sort((a, b) => a.sources.toLowerCase().localeCompare(b.sources.toLowerCase())))
            }
            if(option === "by_date"){
                setDataSet([...dataSet].sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)))
            }
            if(option === "by_status"){
                setDataSet([...dataSet].sort((a, b) => b.status.toLowerCase().localeCompare(a.status.toLowerCase())))
            }
            setSearchParams({sort: option})
        }
    }, [option])

    const handleDeleleParsing = (parsing_result_id) => {
        removeParsingMutate({parsing_result_id})
        setDeletedItemId(parsing_result_id)
        const sortParam = searchParams.get("sort")
        if(sortParam){
            setOption(sortParam)
        }
        else{
            setOption("by_date")
            setSearchParams({sort: "by_date"})
        }
    }

    return (
        <div className={classes.flexing}>
            <div className={`${classes.toolsPanel} flex`}>
                <div className={`${classes.toolsKit} flex`}>
                    <ReturnPage />

                    <SearchInput
                        value={search}
                        setData={setSearch}
                    />
                    <LinkButton link={"/nih/parsing-launcher"} content={"Добавить"} />
                </div>
                <div>
                    <Select options={options} setValue={setOption} />
                </div>
            </div>
            <div className={classes.parser}>
                <ul className={classes.parserContent}>
                    {
                        dataSet?.length !== 0 ? 
                        resultParsingLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                        resultParsingError ? <ServerError /> :
                        dataSet
                        ?.filter(item => item.sources.toLowerCase().includes(search.toLowerCase()))
                        .map(item => (
                            <li className={`${classes.parserItem} flex`} key={item.parsing_result_id}>
                                <div onClick={() => handleDeleleParsing(item.parsing_result_id)}>
                                    <img src={removeParsingPending ? (deletedItemId === item.parsing_result_id ? pendingIconBlack : deleteIcon) : deleteIcon} alt="del" />
                                </div>
                                <div>
                                    <span>{item.sources || "Telegram"}</span>
                                </div>
                                <div>
                                    <Moment format="YYYY/MM/DD HH:mm" date={item.created_at}/>
                                </div>
                                <div>{item.status === "REQUESTED" || item.status === "IN_PROGRESS" ? (<div className={classes.loader}></div>) : item.status}</div>
                                <div onClick={() => handleParserResultInfo(item.parsing_result_id)}>
                                    <ReactButton content={"Инфо"} />
                                </div>
                            </li>
                        ))
                        :
                        <Notfound link={"/nih/parsing-launcher"} content={"Запустите парсер"}/>

                    }
                </ul>
            </div>
        </div>
    )
}
