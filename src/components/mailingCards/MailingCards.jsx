import React from 'react'
import classes from "./MailingCards.module.css"
import Logo from '../ui/logo/Logo'
export default function MailingCards({ active, id }) {
    return (
        <div className={classes.cardBox}>
            <div className={`${classes.parserId} ${active && classes.activeCard}`}>Парсер {id}</div>
            <div className={classes.channel}>
                <Logo w={32} h={32} src={""} />
                <p>Ноготочки ЕКБ</p>
            </div>
            <div className={classes.participantName}>Анна</div>
        </div>
    )
}
