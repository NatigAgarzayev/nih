import React from 'react'
import errorIcon from "../../assets/images/error-icon.svg"
import classes from "./ServerError.module.css"

export default function ServerError() {
  return (
    <div className={classes.serverError}>
        <img src={errorIcon} alt="" />
        <p>Ошибка сети</p>
    </div>
  )
}
