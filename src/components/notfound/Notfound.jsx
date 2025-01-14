import React from 'react'
import classes from "./Notfound.module.css"
import Button from '../ui/button/Button'
export default function Notfound({title, link, content}) {
  return (
    <div className={classes.notfound}>
        <h2>{title ? title : "Ничего не найдено"}</h2>
        {
          (link && content) &&
          <Button link={link} content={content}/>
        }
    </div>
  )
}
