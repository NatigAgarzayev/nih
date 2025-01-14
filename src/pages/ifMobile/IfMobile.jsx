import classes from "./IfMobile.module.css"
import img from "../../assets/images/onlydesktop.webp"
export default function IfMobile() {
    return (
        <div className={classes.layout}>
            <div>
                <img src={img} alt="" />
                <p className={classes.text}>
                    Пожалуйста, воспользуйтесь <span>компьютером</span> для работы с сервисом
                </p>
            </div>
        </div>
    )
}
