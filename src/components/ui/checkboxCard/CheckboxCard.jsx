import React from 'react'
import classes from "./CheckboxCard.module.css"
import Logo from "../logo/Logo"
import Checkbox from '../checkbox/Checkbox'
export default function CheckboxCard({ checkboxId, customClickEvent }) {
    return (
        <div className={classes.checkboxPricipal}>
            <label onClick={customClickEvent} htmlFor={checkboxId} className={`${classes.checkboxLabel}`}>
            </label>
            <div className={`${classes.checkbox} flex`}>
                <div className={`${classes.cahecboxFirstPart} flex`}>
                    <Logo w={32} h={32} src={""} />
                    <p className={classes.channelName}>Ноготочки ЕКБ</p>
                </div>

                <div>
                    <Checkbox id={checkboxId} />
                </div>
            </div>
        </div>

    )
}
