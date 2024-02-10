import React, { useState } from 'react'
import classes from "./FilterParser.module.css"
import { useForm } from 'react-hook-form';
import verif from "../../assets/images/verified.svg"

export default function FilterParser() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
    const [range, setRange] = useState(0) 
    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="by_key_word">По ключевому слову</label>
                <select id='by_key_word' className={classes.selectInput} {...register("by_key_word")}>
                    <option value="Blog">Блоги</option>
                    <option value="News">Новости и СМИ</option>
                    <option value="Design">Дизайн</option>
                    <option value="Humour"> Юмор и Развлечения</option>
                    <option value="Tech">Технолонии</option>
                    <option value="Economy">Экономика</option>
                    <option value="Business">Бизнес и стартапы</option>
                    <option value="Cripto"> Криптовалюты</option>
                    <option value="Travel">Путешевствия</option>
                </select>
            </div>
            <div>
                <label htmlFor="by_theme">Тематика канала</label>
                <select className={classes.selectInput} {...register("by_theme")}>
                    <option value="Blog">Блоги</option>
                    <option value="News">Новости и СМИ</option>
                    <option value="Design">Дизайн</option>
                    <option value="Humour"> Юмор и Развлечения</option>
                    <option value="Tech">Технолонии</option>
                    <option value="Economy">Экономика</option>
                    <option value="Business">Бизнес и стартапы</option>
                    <option value="Cripto"> Криптовалюты</option>
                    <option value="Travel">Путешевствия</option>
                </select>
            </div>
            <div>
                <label htmlFor="by_lang">Язык канала</label>
                <select className={classes.selectInput} {...register("by_lang")}>
                    <option value="Russian">Русский</option>
                    <option value="English">Английский</option>
                    <option value="Kazakh">Казахский</option>
                    <option value="Spanish">Испанский</option>
                </select>
            </div>
            <div>
                <label htmlFor="by_type">Тип канала</label>
                <select className={classes.selectInput} {...register("by_type")}>
                    <option value="Any">Любой</option>
                    <option value="Public">Публичный</option>
                    <option value="Private">Приватный</option>
                </select>
            </div>
            <div>
                <label htmlFor="by_age">Возраст канала от (мес.)</label>
                <div className={`${classes.rangeStat} flex`}>
                    <div>
                        {range}+
                    </div>
                    <div>
                        36+
                    </div>
                </div>
                <input id='by_age' type="range" {...register("by_age")} max={36} min={0} step={1} value={range} onChange={(e) => setRange(e.target.value)}/>
            </div>
           
            <div>
                <label htmlFor="by_type">Подписчиков</label>
                <div className={classes.subs}>
                    <div>
                        <input type="text" placeholder='от' {...register("by_subs_begin")} />
                    </div>
                    <div>
                        <input type="text" placeholder='до' {...register("by_subs_end")}/>
                    </div>
                </div>
            </div>
            <div className={classes.lineHr}></div>
            <div className={classes.verification}>
                <div className={classes.checkboxBox}>
                    <input id='by_verification' className={classes.inputCheckbox} type="checkbox" {...register("by_verification")}/>
                    <div className={classes.verified}>
                       <div>
                            <label htmlFor="by_verification">
                                Верифицированный 
                                <img src={verif} alt="" />
                            </label>
                       </div>
                    </div>
                </div>
            </div>
            <div className={classes.lineHr}></div>
            <div>
                <div className={classes.checkboxBox}>
                    <input id='by_red_mark' className={classes.inputCheckbox} type="checkbox" {...register("by_red_mark")}/>
                    <div><label htmlFor="by_red_mark">Без красной метки</label></div>
                </div>
                <div className={classes.checkboxBox}>
                    <input id='by_scam_fake' className={classes.inputCheckbox} type="checkbox" {...register("by_scam_fake")}/>
                    <div><label htmlFor="by_scam_fake">Без метки SCAM/FAKE</label></div>
                </div>
                <div className={classes.checkboxBox}>
                    <input className={classes.inputCheckbox} type="checkbox" id="by_died_mark" {...register("by_died_mark")}/>
                    <div><label htmlFor="by_died_mark">Скрывать {"мертвые"}</label></div>
                </div>
            </div>
            <input className={classes.button} type="submit" value="Искать"/>
        </form>
    )
    
}
