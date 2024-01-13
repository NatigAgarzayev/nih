import React from 'react'
import classes from "./Select.module.css"
import sortIcon from "../../../assets/images/sort.svg"

export default function Select({ options }) {
    return (
        <div className={classes.sortLabel}>
            <div className={`${classes.sortFront} flex`}>
                <img src={sortIcon} alt="sort" />
                <p>Сортировать</p>
            </div>
            <select className={classes.sortBack} id="sort">
                {
                    options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    )
}