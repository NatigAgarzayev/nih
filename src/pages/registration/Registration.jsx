import React from 'react'
import classes from "./Registration.module.css"
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function Registration() {
  const { 
    register,
    handleSubmit,
    formState: { errors },  
  } = useForm()

  const onSubmit = (data) => alert(JSON.stringify(data))

  return (
    <div className={classes.registerBack}>
      <div className={classes.formRegisterBlock}>
        <div className={classes.titleBox}>
          <h3>Регистрация</h3>
          <p>Чтобы войти в профиль, зарегистрируйтесь:</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className={classes.inputRegister} {...register("email", {required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g})} placeholder="Введите почту"/>
          <input type="password" className={`${classes.inputRegister}`} {...register("pass", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})} placeholder="Введите пароль" />
          <input type="password" className={classes.inputRegister} {...register("passConfirm", {required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/})} placeholder="Подтвердите пароль"/>
          <div className={classes.checkboxBox}>
              <input id='personal__data' className={classes.inputCheckbox} type="checkbox" {...register("personal__data", {required: true})}/>
              <div><label htmlFor="personal__data">Я согласен на обработку персональных данных на сайте</label></div>
          </div>
          <input className={classes.button} type="submit" value="Зарегистрироваться"/>
        </form>
        <Link className={classes.thereIsAcc} to="/login">Уже есть аккаунт?</Link>
      </div>
    </div>
  )
}
