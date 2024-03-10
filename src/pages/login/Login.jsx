import React from 'react'
import classes from "./Login.module.css"
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Login() {
  
    const { 
        register,
        handleSubmit,
        formState: { errors },  
    } = useForm()

    const onSubmit = (data) => alert(JSON.stringify(data))

  return (
    <div className={classes.loginBack}>
      <div className={classes.formLoginBlock}>
        <div className={classes.titleBox}>
          <h3>Авторизация</h3>
          <p>Чтобы войти в профиль, авторизуйтесь:</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className={classes.inputLogin} {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} placeholder="Введите почту"/>
          <input type="password" className={`${classes.inputLogin}`} {...register("pass", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})} placeholder="Введите пароль" />
          <Link style={{fontSize: "1.6rem"}} to="/registration">Забыли пароль?</Link>
          <div className={classes.checkboxBox}>
              <input id='personal__data' className={classes.inputCheckbox} type="checkbox" {...register("personal__data", {required: true})}/>
              <div><label htmlFor="personal__data">Запонмить входные данные</label></div>
          </div>
          <input className={classes.button} type="submit" value="Войти"/>
        </form>
        <Link className={classes.thereIsAcc} to="/registration">Нет аккаунта?</Link>
      </div>
    </div>
  )
}
