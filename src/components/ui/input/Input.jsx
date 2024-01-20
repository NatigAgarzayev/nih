import React from 'react'
import classes from "./Input.module.css"
export default function Input({ value, setValue, placeholder }) {
    return (
        <>
            <input value={value} onChange={(e) => setValue(e.target.value)} className={classes.input} type="text" name="" id="" placeholder={placeholder} />
        </>
    )
}
