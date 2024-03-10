import React from 'react'
import classes from "./Notfound.module.css"
import Button from '../ui/button/Button'
export default function Notfound({link, content}) {
  return (
    <div className={classes.notfound}>
        <h2>Ничего не найдено</h2>
        <Button link={link} content={content}/>
    </div>
  )
}
