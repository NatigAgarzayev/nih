import { useEffect } from 'react'
import classes from "./Profile.module.css"
import ReturnPage from "../../components/ui/returnPage/ReturnPage"
import profileImage from "../../assets/images/Zatichka.jpg"
import Button from "../../components/ui/button/Button"
import editIcon from "../../assets/images/edit-2.svg"
import { useGetUser } from '../../api/auth/queries'
export default function Profile() {

    const {data: user, refetch: getUser, isLoading: userLoading} = useGetUser()

    useEffect(() => {
        getUser()
    }, [])

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
                    <h2>{userLoading && "Получение имени..."}{user?.name}</h2>
                    <p className={classes.email}>{userLoading && "Получение почты..."}{user?.email}</p>
                    <div className={classes.profileStat}>
                        <p>Кол-во доступных продуктов: {userLoading && "..."}{user?.amount_available_products}</p>
                        <p>Кол-во контактов: {userLoading && "..."}{user?.amount_contacts}</p>
                        <p>Кол-во успешных сделок: {userLoading && "..."}{user?.amount_success_deals}</p>
                        <div className={classes.tarif}>
                            <h3>О тарифе</h3>
                            <p>с 01.01.2024 по 08.01.2024 </p>
                            <Button link={"/nih"} content={"Продлить тариф"} />
                        </div>
                    </div>
                    {/* <div className={classes.editBox}>
                        <div className={classes.editProfile}>
                            <p>Редактировать профиль</p>
                            <img src={editIcon} alt="edit" />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
