import React, { useState } from 'react'
import classes from "./Parser.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import Select from '../../components/ui/select/Select'

export default function Parser() {

    const options = [
        { value: "1", label: "Сортировать по имени" },
        { value: "2", label: "Сортировать по источнику" },
        { value: "3", label: "Сортировать по дате" },
        { value: "4", label: "Сортировать по статусу" },
    ]

    const [search, setSearch] = useState("")

    return (
        <div>
            <h2 className={classes.parsingNumber}>Результаты парсинга №213124</h2>
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
                    <Select options={options} />
                </div>
            </div>
        </div>
    )
}
