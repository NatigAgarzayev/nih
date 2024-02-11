import React, { useState } from 'react'
import classes from "./Contacts.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import Select from '../../components/ui/select/Select'
import Button from '../../components/ui/button/Button'
import SquareLink from '../../components/ui/squareLink/SquareLink'
import { useGetContacts } from '../../api/contact/queries'

export default function Contacts() {

    const options = [
        { value: "by_name", label: "Сортировать по имени" },
        { value: "by_source", label: "Сортировать по источнику" },
        { value: "by_date", label: "Сортировать по дате" },
    ]

    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select

    const {data: contactsData, isLoading: contactsLoading} = useGetContacts()

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
                        !contactsLoading && contactsData?.map((item, index) => (
                            <li key={index} className={`${classes.parserItem} flex`}>
                                <div>
                                    <SquareLink link={"/"} />
                                </div>
                                <div>{item.full_name}</div>
                                <div>{item.source}</div>
                                <div>{item.date}</div>
                                <div>
                                    <Button link={"/"} content={"Инфо"} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
