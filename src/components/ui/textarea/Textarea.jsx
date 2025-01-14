import React, { useEffect, useRef } from 'react'
import classes from "./Textarea.module.css"
export default function Textarea({ cookie, disabled, row, data, setData, placeholder, maxLength }) {
    const refText = useRef(null)
    useEffect(() => {
        if(cookie){
            refText.current.value = cookie
        }
    }, [cookie])
    return (
        <div className={classes.textareaContent}>
            <textarea className={classes.textarea} ref={refText} maxLength={maxLength ? maxLength : 5000} disabled={disabled} rows={row} value={data} onChange={(e) => setData(e.target.value)} placeholder={placeholder ? placeholder : "Введите текст.."}>

            </textarea>
        </div>
    )
}
