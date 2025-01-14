import { Link } from "react-router-dom";
import "../../patterns.css"
import Logo from "../ui/logo/Logo";
import classes from "./Header.module.css"

export default function Header() {
    return (
        <div className={`${classes.header} flex`}>
            <div className={`${classes.nav} flex`}>
                <Link to="/">
                    <div className={classes.logo}>NIH</div>
                </Link>
                <nav>
                    <ul className={`${classes.list} flex`}>
                        <li>
                            <Link to="/nih">Главное</Link>
                        </li>
                        <li>
                            <Link to="/nih/parser">Парсер</Link>
                        </li>
                        <li>
                            <Link to="/nih/mailing">Рассылка</Link>
                        </li>
                        <li>
                            <Link to="/nih/contacts">Контакты</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Link to="/nih/profile">
                <div className={`${classes.profile} flex`}>
                    <p>Ваш профиль</p>
                    <Logo w={48} h={48} src={""} />
                </div>
            </Link>
        </div >
    )
}
