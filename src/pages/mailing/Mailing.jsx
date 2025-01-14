import { useEffect, useState } from 'react'
import classes from "./Mailing.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import Notfound from '../../components/notfound/Notfound'
import { useGetClientMailings, useRemoveNewsletter } from '../../api/mailing/queries'
import Moment from 'react-moment'
import Button from '../../components/ui/button/Button'
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import deleteIcon from "../../assets/images/delete.svg"
import { useNavigate, useSearchParams } from 'react-router-dom'
import Cookies from "js-cookie";
import ServerError from '../../components/serverError/ServerError'
export default function Mailing() {
    const {data: clientMailingsData, isLoading: clientMailingsLoading, isError: clientMailingsError} = useGetClientMailings()
    const {mutate: removeNewsletterMutate, isPending: removeNewsletterPending} = useRemoveNewsletter()
    const [searchParams, setSearchParams] = useSearchParams()
    const [deletedItemId, setDeletedItemId] = useState()
    const nav = useNavigate()

    const options = [
        { value: "by_title", label: "Сортировать по названию" },
        { value: "by_date", label: "Сортировать по дате" },
        { value: "by_status", label: "Сортировать по статусу" },
    ]
    const [search, setSearch] = useState("")
    const [option, setOption] = useState() // chosen option from Select
    const [dataSet, setDataSet] = useState([])
    
    useEffect(() => {
        setDataSet(clientMailingsData?.mailing_result)
    }, [clientMailingsData])

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
            if(option === "by_title"){
                setDataSet([...dataSet].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())))
            }
            else if(option === "by_date"){
                setDataSet([...dataSet].sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)))
            }
            else if(option === "by_status"){
                setDataSet([...dataSet].sort((a, b) => b.status.toLowerCase().localeCompare(a.status.toLowerCase())))
            }
            setSearchParams({sort: option})
        }
    }, [option])


    const handleDeleteNewsletter = (newsletter_id ) => {
        removeNewsletterMutate({newsletter_id})
        setDeletedItemId(newsletter_id)
        const sortParam = searchParams.get("sort")
        if(sortParam){
            setOption(sortParam)
        }
        else{
            setOption("by_date")
            setSearchParams({sort: "by_date"})
        }
    }

    const handleGoToNewsletter = (newsletter_id) => {
        Cookies.set("newsletter_id", newsletter_id)
        nav("/nih/mailing-launcher")
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
                        clientMailingsLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                        clientMailingsError ? <ServerError />:
                        dataSet
                        ?.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
                        ?.map((item) => (
                            <li className={`${classes.parserItem} flex`} key={item?.newsletter_id}>
                                <div onClick={() => handleDeleteNewsletter(item.newsletter_id)}>
                                    <img src={removeNewsletterPending ? (deletedItemId === item.newsletter_id ? pendingIconBlack : deleteIcon) : deleteIcon} alt="del" />
                                </div>
                                <div title={"Перейти к рассылке " + item?.newsletter_id} className={classes.newsletterName} onClick={() => handleGoToNewsletter(item?.newsletter_id)}>{item?.title || `Mailing ${item.newsletter_id}`}</div>
                                <div>
                                    <Moment format="YYYY/MM/DD HH:mm" date={item?.created_at}/>
                                </div>
                                <div>{item.status === "REQUESTED" || item.status === "IN_PROGRESS" ? (<div className={classes.loader}></div>) : item.status}</div>
                                <div title="Контакты рассылки">
                                    <Button link={`/nih/info-mailing/${item.newsletter_id}`} content={"Инфо"} />
                                </div>
                            </li>
                        ))
                        :
                        <Notfound link={"/nih/mailing-launcher"} content={"Запустите рассылку"}/>
                    }
                </ul>
            </div>
        </div>
    )
}
