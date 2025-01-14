import React from 'react'
import classes from "./MailingCards.module.css"
import Logo from '../ui/logo/Logo'
export default function MailingCards({ participantData, active, id }) {
    return (
        <div className={classes.cardBox}>
            <div className={`${classes.parserId} ${active && classes.activeCard}`}>Парсер {id}</div>
                <div className={classes.channel}>
                    <Logo w={32} h={32} src={""} />
                    <p>{participantData ? participantData.full_name : "Not found"}</p>
                </div>
            <div className={classes.participantName}>
            {participantData ? participantData.source_identity : "Not found"}
                </div>
        </div>
    )
}
