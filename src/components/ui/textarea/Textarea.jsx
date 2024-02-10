import React from 'react'
import classes from "./Textarea.module.css"
export default function Textarea({ disabled, row, data, setData, placeholder }) {
    return (
        <textarea disabled={disabled} rows={row} value={data} onChange={(e) => setData(e.target.value)} className={classes.textarea} placeholder={placeholder ? placeholder : "Введите текст.."}>
        </textarea>
    )
}
