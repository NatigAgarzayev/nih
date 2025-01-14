import React from 'react'
import classes from "./Input.module.css"
export default function Input({ disabled, value, setValue, placeholder }) {
    return (
        <>
            <input autoFocus disabled={disabled} value={value} onChange={(e) => setValue(e.target.value)} className={classes.input} type="text" name="" id="" placeholder={placeholder} />
        </>
    )
}
