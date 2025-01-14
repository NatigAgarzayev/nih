import React, { useEffect, useState } from 'react'
import classes from "./FilterParser.module.css"
import { useForm } from 'react-hook-form';
import verif from "../../assets/images/verified.svg"
import { useGetAutoParserCategories, useGetAutoParserLanguages } from '../../api/parser/queries';

export default function FilterParser({setFilterData, setOpened}) {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        setFilterData(data)
        setOpened(false)
    }
    const [range, setRange] = useState(0) 

    const {data: autoParserLanguages, refetch: autoParserLanguagesRefetch} = useGetAutoParserLanguages()
    const {data: autoParserCategories, refetch: autoParserCategoriesRefetch} = useGetAutoParserCategories()

    useEffect(() => {
        const fetchFilterData = () => {
            try {
                autoParserCategoriesRefetch()    
                autoParserLanguagesRefetch()    
            } catch (error) {
                console.log("error = ", error)
            }
        }
        fetchFilterData()
    }, [])

    const handleResetFilter = (data) => {
        setFilterData(data)
        setOpened(false)
    }

    return (
        <div className={classes.fiterWrapper}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                {/* <div>
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
                </div> */}
                <div>
                    <label htmlFor="by_category">По категорию</label>
                    <select className={classes.selectInput} {...register("by_category")}>
                        <option key={0} value={""}>Все категории</option>
                       {
                        autoParserCategories?.categories.map(item => (
                            <option key={item.category_id} value={item.category_id}>{item.name}</option>
                        ))
                       }
                    </select>
                </div>
                <div>
                    <label htmlFor="by_lang">Язык канала</label>
                    <select className={classes.selectInput} {...register("by_lang")}>
                        <option key={0} value={""}>Все языки</option>
                        {
                            autoParserLanguages?.languages.map(item => (
                                <option key={item.language_id} value={item.language_id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                {/* <div>
                    <label htmlFor="by_type">Тип канала</label>
                    <select className={classes.selectInput} {...register("by_type")}>
                        <option value="Any">Любой</option>
                        <option value="Public">Публичный</option>
                        <option value="Private">Приватный</option>
                    </select>
                </div> */}
                {/* <div>
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
                </div>*/}
               
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
                {/* <div className={classes.lineHr}></div>
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
                </div>  */}
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
                   {/*  <div className={classes.checkboxBox}>
                        <input className={classes.inputCheckbox} type="checkbox" id="by_died_mark" {...register("by_died_mark")}/>
                        <div><label htmlFor="by_died_mark">Скрывать {"мертвые"}</label></div>
                    </div> */}
                </div>  
                <input className={classes.button} type="submit" value="Искать"/>
                <p onClick={() => handleResetFilter({by_category: '', by_lang: '', by_red_mark: false, by_scam_fake: false, by_subs_begin: "", by_subs_end: ""})} className={classes.filterReset}>Обнулить фильтр</p>
            </form>
        </div>
    )
    
}
