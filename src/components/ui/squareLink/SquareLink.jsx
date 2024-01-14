import React from 'react'
import classes from "./SquareLink.module.css"
import { Link } from 'react-router-dom'
export default function SquareLink({ link }) {
    return (
        <Link to={link}>
            <div className={classes.square}></div>
        </Link>
    )
}
