import React from 'react'
import classes from "./Checkbox.module.css"
export default function Checkbox({ checked, id }) {
    return (
        <div>
            <input readOnly checked={checked} className={classes.checkbox} type="checkbox" name="" id={id} />
        </div>
    )
}
