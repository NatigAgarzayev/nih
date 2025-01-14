import React from 'react'
import classes from "./Attachment.module.css"
import attachmentImage from "../../assets/images/attachment.svg"
export default function Attachment() {
    return (
        <>
            <label className={classes.label} htmlFor="attachment">
                <img src={attachmentImage} alt="attach file" />
            </label>
            <input className={classes.input} type="file" id='attachment' />
        </>
    )
}
