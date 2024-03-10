import React, { useState } from 'react'
import classes from "./InfoMailing.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import Button from '../../components/ui/button/Button'
import SquareLink from '../../components/ui/squareLink/SquareLink'
import { useGetMailingOne } from '../../api/mailing/queries'
import Notfound from '../../components/notfound/Notfound'

export default function InfoMailing() {

    const options = [
        { value: "by_name", label: "Сортировать по имени" },
        { value: "by_status", label: "Сортировать по статусу" },
        { value: "by_date", label: "Сортировать по дате" },
    ]
    const {data: mailingData, isLoading: mailingLoading} = useGetMailingOne()
    
    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select

    return (
        <div className={classes.flexing}>
            <div className={`${classes.toolsPanel} flex`}>
                <div className={`${classes.toolsKit} flex`}>
                    <ReturnPage />
                    <SearchInput
                        value={search}
                        setData={setSearch}
                    />
                    <LinkButton link={"/nih/parser-launcher"} content={"Добавить"} />
                </div>
                <div>
                    <Select options={options} setValue={setOption} />
                </div>
            </div>
            <div className={classes.parser}>
                <ul className={classes.parserContent}>
                    {
                        mailingData.length !== 0 ? mailingData?.map((item, index) => (
                            <li key={index} className={`${classes.parserItem} flex`}>
                                <div>
                                    <SquareLink link={"/nih"} />
                                </div>
                                <div>{item.full_name}</div>
                                <div>{item.status}</div>
                                <div>{item.date}</div>
                                <div>
                                    <Button link={"/nih/info-mailing"} content={"Написать"} />
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
