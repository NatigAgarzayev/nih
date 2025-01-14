import React from 'react'
import classes from "./ReturnPage.module.css"
import chevron from "../../../assets/images/chevron-left.svg"
import { Link } from 'react-router-dom'
export default function ReturnPage() {
    return (
        <Link to={-1}>
            <div className={`${classes.returnPage} flex`}>
                <img src={chevron} alt="go back" />
                <p>Назад</p>
            </div>
        </Link>
    )
}
