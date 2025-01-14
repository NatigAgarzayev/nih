import React from 'react'
import classes from "./ReactButon.module.css"
export default function ReactButton({ isError, disabled, content }) {
    return (
        <button disabled={disabled} className={`${classes.button} ${isError ? classes.error : null}`}>
            {content}
        </button>
    )
}
