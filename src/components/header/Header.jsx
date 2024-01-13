import { Link } from "react-router-dom";
import "../../patterns.css"
import Logo from "../ui/logo/Logo";
import classes from "./Header.module.css"

export default function Header() {
    return (
        <div className={`${classes.header} flex`}>
            <div className={`${classes.nav} flex`}>
                <div className={classes.logo}>NIH</div>
                <nav>
                    <ul className={`${classes.list} flex`}>
                        <li>
                            <Link to="/parser">Парсер</Link>
                        </li>
                        <li>
                            <Link to="/mailing">Рассылка</Link>
                        </li>
                        <li>
                            <Link to="/contacts">Контакты</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Link to="/profile">
                <div className={`${classes.profile} flex`}>
                    <p>Ваш профиль</p>
                    <Logo w={58} h={58} src={""} />
                </div>
            </Link>
        </div >
    )
}
