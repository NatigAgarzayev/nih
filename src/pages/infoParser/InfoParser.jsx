import classes from "./InfoParser.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import parserInfoData from "../../components/utils/parser"
import CheckboxCard from "../../components/ui/checkboxCard/CheckboxCard"
import Button from "../../components/ui/button/Button"
import { useState } from "react"

export default function Parser() {

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
            <div className={`${classes.toolsKit} flex`}>
                <ReturnPage />
            </div>
            <div className={classes.parser}>
                <div className={classes.parserCheckboxBox}>
                    <h2 className={classes.parserTitle}>Выбранные каналы</h2>
                    <ul className={classes.parserContent}>
                        {
                            parserInfoData.map(item => (
                                <li key={item.id}>
                                    <CheckboxCard customClickEvent={() => handleSelected(item.id)} checkboxId={item.id} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={`${classes.parserAgree} flex`}>
                    <p>Мы проанализировали, мы можем получить {selected?.length} из {parserInfoData?.length} участников</p>
                    <Button className={classes.buttonStyle} link={"/"} content={"OK"} />
                </div>
            </div>
        </div>
    )
}
