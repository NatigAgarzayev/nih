import React, { useState } from 'react'
import classes from "./ParsingLauncher.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import Select from '../../components/ui/select/Select'
import parsingLauncherData from "../../components/utils/parser"
import Button from '../../components/ui/button/Button'
import CheckboxCard from '../../components/ui/checkboxCard/CheckboxCard'
import sort from "../../assets/images/sort.svg"
import Textarea from '../../components/ui/textarea/Textarea'
import ReactButton from '../../components/ui/reactButton/ReactButton'
import { usePostGroups } from '../../api/parser/queries'
import Cookies from 'js-cookie'
import FilterParser from '../../components/filterParser/filterParser'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function ParsingLauncher() {

    const options = [
        { value: "by_subs", label: "Сортировать по кол-ву подписчиков" },
    ]

    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select
    const [textareaChannels, setTextareaChannels] = useState("")
    const [textareaGroups, setTextareaGroups] = useState("")
    const {mutate: mutateGroups, isPending: groupPending,} = usePostGroups()
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
        console.log('start')
        if(textareaChannels !== ""){
            console.log('channels')
            const dataForReq = textareaChannels.split(",")
            for(let i = 0; i < dataForReq.length; i++){
                dataForReq[i] = dataForReq[i].trim()
            }
            console.log(dataForReq)
        }
        else if(textareaGroups !== ""){
            console.log('groups')
            const dataForReq = textareaGroups.split(",")
            for(let i = 0; i < dataForReq.length; i++){
                dataForReq[i] = dataForReq[i].trim()
            }
            const resArr = []
            
            await Promise.allSettled(
                dataForReq.map(item => {
                    mutateGroups(item)
                })
            ).then(results => {
                resArr.push(results)
            })
            
            console.log(resArr)
            /* for(let i = 0; i < dataForReq.length; i++){
                const storeRes = await mutateGroups(dataForReq[i])
                resArr.push(storeRes)
            } */
            // Cookies.set("parserResults", JSON.stringify(resArr))
        }
    }

    /* const {mutate: mutateGroupParsing, isPending} = useMutation({
        mutationFn: (data) => {
            console.log(data)
            axios.post(`http://84.201.179.250:3000/parser/participants/group/${data}`)
        },
        onSuccess: (data) => {
            console.log(data)
        }
    }) 
    */
    
    // Promise.allSettled(() => {
    //     mutateGroupParsing()
    // })
    
    // if( isPending) return <div>Pending...</div>


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
                                    <CheckboxCard customClickEvent={() => handleSelected(item.id)} checkboxId={item.id} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={classes.manualParsing}>
                    <h2 className={classes.parserTitle}>Ручной</h2>
                    <div>
                        <Textarea disabled={textareaGroups !== "" ? true : false} row={5} data={textareaChannels} setData={setTextareaChannels} placeholder={"Введите ссылки на каналы через запятую"} />
                    </div>
                    <div className={classes.groupTextarea}>
                        <Textarea disabled={textareaChannels !== "" ? true : false} row={4} data={textareaGroups} setData={setTextareaGroups} placeholder={"Введите ссылки на группы через запятую"} />
                    </div>
                    <div onClick={handleParsingLauncher} className={classes.buttonLaunch}>
                        <ReactButton disabled={groupPending} content={"Запуск"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
