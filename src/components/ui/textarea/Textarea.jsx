import React from 'react'
import classes from "./Textarea.module.css"
export default function Textarea({ row, data, setData, placeholder }) {
    return (
        <textarea rows={row} value={data} onChange={(e) => setData(e.target.value)} className={classes.textarea} placeholder={placeholder ? placeholder : "Введите текст.."}>
        </textarea>
    )
}
