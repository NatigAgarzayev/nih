import React from 'react'
import classes from "./Profile.module.css"
import ReturnPage from "../../components/ui/returnPage/ReturnPage"
import profileImage from "../../assets/images/profile.jpg"
import Button from "../../components/ui/button/Button"
import editIcon from "../../assets/images/edit-2.svg"
export default function Profile() {
    return (
        <div className={classes.profile}>
            <div>
                <ReturnPage />
            </div>
            <div className={classes.profileContent}>
                <div className={classes.profileImageImg}>
                    <img src={profileImage} alt="profil_page" />
                </div>
                <div className={classes.profileInfo}>
                    <h2>Алексей</h2>
                    <p className={classes.email}>gmail@yandex.com</p>
                    <div className={classes.profileStat}>
                        <p>Кол-во доступных продуктов</p>
                        <p>Кол-во контактов</p>
                        <p>Кол-во успешных сделок</p>
                        <div className={classes.tarif}>
                            <h3>О тарифе</h3>
                            <p>с 01.01.2024 по 08.01.2024 </p>
                            <Button link={""} content={"Продлить тариф"} />
                        </div>
                    </div>
                    <div className={classes.editBox}>
                        <div className={classes.editProfile}>
                            <p>Редактировать профиль</p>
                            <img src={editIcon} alt="edit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
