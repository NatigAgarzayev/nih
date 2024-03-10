import React, { useEffect, useState } from 'react'
import classes from "./Mailing.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import Button from '../../components/ui/button/Button'
import SquareLink from '../../components/ui/squareLink/SquareLink'
import { useMutation } from '@tanstack/react-query'
import { useGetParticipantById } from '../../api/parser/queries'
import { useGetMailingAll } from '../../api/mailing/queries'
import Notfound from '../../components/notfound/Notfound'

export default function Mailing() {
    const options = [
        { value: "by_source", label: "Сортировать по источнику" },
        { value: "by_theme", label: "Сортировать по тематике" },
        { value: "by_status", label: "Сортировать по статусу" },
    ]
    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select
    
    const {data: groupId, refetch: refetchGroup, isLoading} = useGetParticipantById(64)
    const {data: mailingData, isLoading: mailingLoading} = useGetMailingAll()

    const handleMutation = () => {
        // mutateGroupParsing()
        refetchGroup()
        console.log(groupId)
    }

    if( isLoading || mailingLoading) return <div>Pending...</div>
   

    useEffect(() => {
        if(option === "by_source"){
            console.log("sorted")
        }
        else if(option === "by_theme"){
            mailingData?.data.sort((a,b)=> new Date(b.theme) - new Date(a.theme))
        }
        else if(option === "by_status"){
            mailingData?.data.sort((a, b) =>  a.status.localeCompare(b.status))
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
                        mailingData.length !== 0 ? mailingData?.map((item, index) => (
                            <li className={`${classes.parserItem} flex`} key={index}>
                                <div>
                                    <SquareLink link={"/nih"} />
                                </div>
                                <div onClick={handleMutation}>{item.source}</div>
                                <div>{item.topic}</div>
                                <div>{item.status}</div>
                                <div>
                                    <Button link={"/nih/info-mailing"} content={"Инфо"} />
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
