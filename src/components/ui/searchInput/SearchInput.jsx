import React from 'react'
import classes from "./SearchInput.module.css"
import searchIcon from "../../../assets/images/search.svg"
export default function SearchInput({ data, setData, placeholder }) {
    return (
        <div className={`${classes.searchBox} flex`}>
            <img src={searchIcon} alt="search" />
            <input value={data} onChange={(e) => setData(e.target.value)} className={classes.searchInput} type="text" placeholder={placeholder ? placeholder : "Поиск"} />
        </div>
    )
}
