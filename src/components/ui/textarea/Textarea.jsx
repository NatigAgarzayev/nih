import React from 'react'
import classes from "./Textarea.module.css"
export default function Textarea({ data, setData, placeholder }) {
    return (
        <textarea rows="5" value={data} onChange={(e) => setData(e.target.value)} className={classes.textarea} placeholder={placeholder ? placeholder : "Введите текст.."}>
            ,,        </textarea>
    )
}
