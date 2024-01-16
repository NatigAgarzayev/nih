import React, { useState } from 'react'
import classes from "./InfoMailing.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'
import InfoMailingData from "../../components/utils/parser"
import Button from '../../components/ui/button/Button'
import SquareLink from '../../components/ui/squareLink/SquareLink'

export default function InfoMailing() {

    const options = [
        { value: "by_name", label: "Сортировать по имени" },
        { value: "by_status", label: "Сортировать по статусу" },
        { value: "by_date", label: "Сортировать по дате" },
    ]

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
                    <LinkButton link={"/parser-launcher"} content={"Добавить"} />
                </div>
                <div>
                    <Select options={options} setValue={setOption} />
                </div>
            </div>
            <div className={classes.parser}>
                <ul className={classes.parserContent}>
                    {
                        InfoMailingData.map(item => (
                            <li className={`${classes.parserItem} flex`} key={item.id}>
                                <div>
                                    <SquareLink link={"/"} />
                                </div>
                                <div>Имя Фамилия {item.id}</div>
                                <div>Статус {item.id}</div>
                                <div>Дата {item.id}</div>
                                <div>
                                    <Button link={"/info-mailing"} content={"Написать"} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
