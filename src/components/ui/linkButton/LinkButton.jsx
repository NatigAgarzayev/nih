import React from 'react'
import classes from "./LinkButton.module.css"
import { Link } from 'react-router-dom'
export default function LinkButton({ link, content }) {
    return (
        <Link to={link} >
            <p className={classes.content}>{content}</p>
        </Link >
    )
}
