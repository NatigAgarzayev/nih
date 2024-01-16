import React from 'react'
import classes from "./Checkbox.module.css"
export default function Checkbox({ id }) {
    return (
        <>
            <input className={classes.checkbox} type="checkbox" name="" id={id} />
        </>

    )
}
