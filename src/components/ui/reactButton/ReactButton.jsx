import React from 'react'
import classes from "./ReactButon.module.css"
export default function ReactButton({ content }) {
    return (
        <div className={classes.button}>
            {content}
        </div>
    )
}
