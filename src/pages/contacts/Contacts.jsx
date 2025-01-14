import { useEffect, useState } from 'react'
import classes from "./Contacts.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import Select from '../../components/ui/select/Select'
import Button from '../../components/ui/button/Button'
import { useGetClientContacts, useRemoveClientContact } from '../../api/contact/queries'
import Notfound from '../../components/notfound/Notfound'
import Moment from 'react-moment'
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import deleteIcon from "../../assets/images/delete.svg"
import { useSearchParams } from 'react-router-dom'
import ServerError from '../../components/serverError/ServerError'
export default function Contacts() {

    const {data: clientContactsData, isLoading: clientContactsLoading, isError: clientContactsError} = useGetClientContacts()
    const {mutate: removeClientContactMutate, isPending: removeClientContactPending} = useRemoveClientContact()
    const [searchParams, setSearchParams] = useSearchParams()
    const [dataSet, setDataSet] = useState([])
    const [deletedItemId, setDeletedItemId] = useState()

    const options = [
        { value: "by_name", label: "Сортировать по имени" },
        { value: "by_source", label: "Сортировать по источнику" },
        { value: "by_date", label: "Сортировать по дате" },
    ]

    const [search, setSearch] = useState("")
    const [option, setOption] = useState() // chosen option from Select

    useEffect(() => {
        setDataSet(clientContactsData?.contacts)
    }, [clientContactsData])

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
            if(option === "by_name"){
                setDataSet([...dataSet].sort((a, b) => a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())))
            }
            else if(option === "by_date"){
                setDataSet([...dataSet].sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)))
            }
            else if(option === "by_source"){
                setDataSet([...dataSet].sort((a, b) => a.source_identity.toLowerCase().localeCompare(b.source_identity.toLowerCase())))
            }
            setSearchParams({sort: option})
        }
    }, [option])


    const handleDeleteContact = (chat_id ) => {
        removeClientContactMutate({chat_id})
        setDeletedItemId(chat_id)
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
                </div>
                <div>
                    <Select options={options} setValue={setOption} />
                </div>
            </div>
            <div className={classes.parser}>
                <ul className={classes.parserContent}>
                    {
                        dataSet?.length !== 0 ?
                        clientContactsLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                        clientContactsError ? <ServerError/> :
                        dataSet
                        ?.filter(item => item.full_name.toLowerCase().includes(search.toLowerCase()))
                        .map((item, index) => (
                            <li key={index} className={`${classes.parserItem} flex`}>
                                <div onClick={() => handleDeleteContact(item.chat_id)}>
                                    <img src={removeClientContactPending ? (deletedItemId === item.chat_id ? pendingIconBlack : deleteIcon) : deleteIcon} alt="del" />
                                </div>
                                <div>{item?.full_name}</div>
                                <div>{item?.source_identity || "Telegram"}</div>
                                <div>
                                    <Moment format="YYYY/MM/DD HH:mm" date={item?.created_at}/>
                                </div>
                                <div>
                                    <Button link={`/nih/messenger/${item.chat_id}`} content={"Написать"} />
                                </div>
                            </li>
                        ))
                        :
                        <Notfound link={"/nih/mailing-launcher"} content={"Сперва запустите рассылку"}/>
                    }
                </ul>
            </div>
        </div>
    )
}
