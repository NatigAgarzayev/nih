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

export default function ParsingLauncher() {

    const options = [
        { value: "by_subs", label: "Сортировать по кол-ву подписчиков" },
    ]

    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select
    const [textarea, setTextarea] = useState("")

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

    return (
        <div className={classes.flexing}>
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
                        <div className={`${classes.sort} flex`}>
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
                        <Textarea data={textarea} setData={setTextarea} placeholder={"Введите ссылки на каналы или группы через запятую"} />
                    </div>
                    <div className={classes.buttonLaunch}>
                        <Button link={""} content={"Запуск"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
