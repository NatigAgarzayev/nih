import React, { useEffect, useState } from 'react'
import classes from "./Mailing.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import parserData from "../../components/utils/parser"
import Button from '../../components/ui/button/Button'
import SquareLink from '../../components/ui/squareLink/SquareLink'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Mailing() {

    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select
    


    const {mutate: mutateGroupParsing, isPending} = useMutation({
        mutationFn: () => {
            axios.post("http://84.201.179.250:3000/parser/participants/group/fufelflexchat")
        },
        onMutate: () => {
            console.log("Mutating...")
        },
        onSuccess: (data) => {
            console.log(data)
        }
    }) 
    
    const handleMutation = async () => {
        mutateGroupParsing()
        /* console.log("Started..")
        await axios.post("http://84.201.179.250:3000/parser/participants/channel/magistratura_az", {
            depth: 1,
        })
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(err => console.log("Error: ", err)) */
    }

   /*  useQuery({
        queryKey: ['groups'],
        queryFn: () => {
            axios.post("http://84.201.179.250:3000/parser/participants/group/fufelflexchat").then(res => res.data)
        }
    }) */

    if(isPending) return <div>Pending...</div>

    const options = [
        { value: "by_source", label: "Сортировать по источнику" },
        { value: "by_theme", label: "Сортировать по тематике" },
        { value: "by_status", label: "Сортировать по статусу" },
    ]

    return (
        <div className={classes.flexing}>
            <div className={`${classes.toolsPanel} flex`}>
                <div className={`${classes.toolsKit} flex`}>
                    <ReturnPage />
                    <SearchInput
                        value={search}
                        setData={setSearch}
                    />
                    <LinkButton link={"/mailing-launcher"} content={"Добавить"} />
                </div>
                <div>
                    <Select options={options} setValue={setOption} />
                </div>
            </div>
            <div className={classes.parser}>
                <ul className={classes.parserContent}>
                    {
                        parserData.map(item => (
                            <li className={`${classes.parserItem} flex`} key={item.id}>
                                <div>
                                    <SquareLink link={"/"} />
                                </div>
                                <div onClick={handleMutation}>Источник {item.id}</div>
                                <div>Тематика {item.id}</div>
                                <div>Статус {item.id}</div>
                                <div>
                                    <Button link={"/info-mailing"} content={"Инфо"} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
