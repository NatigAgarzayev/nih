import React, { useState } from 'react'
import classes from "./Select.module.css"
import sortIcon from "../../../assets/images/sort.svg"

export default function Select({ options, setValue }) {

    const [active, setActive] = useState(false)

    const handleOptionClick = (value) => {
        setValue(value)
        setActive(false)
    }

    const handleActive = () => {
        setActive(true)
    }

    const handleOverlayClick = () => {
        setActive(false)
    }

    return (
        <>
            {
                active && <div onClick={handleOverlayClick} className={classes.overlay}></div>
            }
            <div className={classes.sortLabel}>
                <div onClick={handleActive} className={`${classes.sortFront} flex`}>
                    <img src={sortIcon} alt="sort" />
                    <p>Сортировать</p>
                </div>
                {
                    active && (
                        <ul className={classes.sortBack}>
                            {
                                options.map(option => (
                                    <li onClick={() => handleOptionClick(option.value)} key={option.value}>{option.label}</li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </>
    )
}