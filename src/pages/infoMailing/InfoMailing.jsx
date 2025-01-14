import { useEffect, useState } from 'react'
import classes from "./InfoMailing.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import Button from '../../components/ui/button/Button'
import Notfound from '../../components/notfound/Notfound'
import { useGetMailingParticipants, useGetNewsletterStatus } from '../../api/mailing/queries.js'
import { useParams,useSearchParams } from 'react-router-dom'
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"

import Moment from 'react-moment'
import ServerError from '../../components/serverError/ServerError.jsx'

export default function InfoMailing() {

    const {id} = useParams()
    const [dataSet, setDataSet] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    const {data: mailingStatus} = useGetNewsletterStatus(id)
    const {data: mailingParticipantsData, isLoading: mailingParticipantsLoading, isError: mailingParticipantsError} = useGetMailingParticipants(id)

    const options = [
        { value: "by_name", label: "Сортировать по имени" },
        { value: "by_source", label: "Сортировать по источнику" },
        { value: "by_date", label: "Сортировать по дате" },
    ]

    const [search, setSearch] = useState("")
    const [option, setOption] = useState() // chosen option from Select
    
    useEffect(() => {
        setDataSet(mailingParticipantsData?.newsletter_info)
    }, [mailingParticipantsData])

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
        if(mailingParticipantsData?.newsletter_info.length > 0){
            if(option === "by_name"){
                setDataSet([...dataSet].sort((a, b) => b.full_name.toLowerCase().localeCompare(a.full_name.toLowerCase())))
            }
            else if(option === "by_date"){
                setDataSet([...dataSet].sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)))
            }
            else if(option === "by_source"){
                setDataSet([...dataSet].sort((a, b) => b.source_identity.toLowerCase().localeCompare(a.source_identity.toLowerCase())))
            }
            setSearchParams({sort: option})
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
                    <LinkButton link={"/nih/mailing-launcher"} content={"Добавить"} />
                </div>
                <div>
                    <Select options={options} setValue={setOption} />
                </div>
            </div>
            <div className={classes.parser}>
                <ul className={classes.parserContent}>
                    {
                        dataSet?.length !== 0 ? 
                        mailingParticipantsLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                        mailingParticipantsError ? <ServerError/> :
                        dataSet
                        ?.filter(item => item.full_name.toLowerCase().includes(search.toLowerCase()))
                        ?.map((item, index) => (
                            <li key={index} className={`${classes.parserItem} flex`}>
                                <div>{item?.full_name}</div>
                                <div>{item?.source_identity}</div>
                                <div>
                                    <Moment format="YYYY/MM/DD HH:mm" date={item?.created_at}/>    
                                </div>
                                <div>
                                    <Button link={`/nih/messenger/${item?.chat_id}`} content={"Написать"} />
                                </div>
                            </li>
                        ))
                        :
                        mailingStatus?.status === "REQUESTED" || mailingStatus?.status === "IN_PROGRESS"?
                                <Notfound title={"Идет рассылка..."} link={"/nih/mailing"} content={"Назад"}/>
                                :
                                mailingStatus?.status === "FAILED" ? 
                                <Notfound title={"Ошибка рассылки"} link={"/nih/mailing-launcher"} content={"Запустите снова"}/>
                                :
                                <Notfound link={"/nih/mailing-launcher"} content={"Запустите рассылку"}/>
                    }
                </ul>
            </div>
        </div>
    )
}
