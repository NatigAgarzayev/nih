import React from 'react'
import classes from "./ReactButon.module.css"
export default function ReactButton({ disabled, content }) {
    return (
        <button disabled={disabled} className={classes.button}>
            {content}
        </button>
    )
}
