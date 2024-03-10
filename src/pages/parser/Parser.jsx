import { useEffect, useState } from 'react'
import classes from "./Parser.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import SquareLink from '../../components/ui/squareLink/SquareLink'
import { useGetParsingResults } from '../../api/parser/queries'
import Moment from 'react-moment'
import ReactButton from '../../components/ui/reactButton/ReactButton'
import { useNavigate } from 'react-router-dom'
import Notfound from '../../components/notfound/Notfound'

export default function Parser() {

    const nav = useNavigate()
    
    const options = [
        { value: "by_source", label: "Сортировать по источнику" },
        { value: "by_date", label: "Сортировать по дате" },
        { value: "by_status", label: "Сортировать по статусу" },
    ]

    const {data: resultParsingData} = useGetParsingResults()

    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select

    const handleParserResultInfo = (id) => {
        nav(`/nih/info-parser/${id}`)
    }

    useEffect(() => {
        if(option === "by_source"){
            console.log("sorted")
        }
        else if(option === "by_date"){
            resultParsingData?.data.parsing_results.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
        }
        else if(option === "by_status"){
            resultParsingData?.data.parsing_results.sort((a, b) =>  a.status.localeCompare(b.status))
        }
    }, [option])

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
                        resultParsingData?.data.parsing_results.length !== 0 ? resultParsingData?.data.parsing_results.map(item => (
                            <li className={`${classes.parserItem} flex`} key={item.parsing_result_id}>
                                <div>
                                    <SquareLink link={"/nih"} />
                                </div>
                                <div>Telegram</div>
                                <div>
                                    asd
                                    {/* <Moment format="YYYY/MM/DD HH:mm" date={item.created_at}/> */}
                                </div>
                                <div>{item.status === "REQUESTED" ? (<div className={classes.loader}></div>) : item.status}</div>
                                <div onClick={() => handleParserResultInfo(item.parsing_result_id)}>
                                    {/* disabled={item.status !== "SUCCEDED" ? true : false} */}
                                    <ReactButton content={"Инфо"} />
                                </div>
                            </li>
                        ))
                        :
                        // <div>Нет данных. Походу вы никогда раньше не парсили данные.</div>
                        <Notfound link={"/nih/parsing-launcher"} content={"Запустите парсер"}/>

                    }
                </ul>
            </div>
        </div>
    )
}
