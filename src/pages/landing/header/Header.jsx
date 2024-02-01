import { useState } from "react"
import "./Header.css"
export default function Header() {

    const [active, setActive] = useState(false)

    const handleBurger = () => {
        setActive(!active)
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__body">
                    <div className="header__left">
                        <div className="header__logo">NIH</div>
                        <ul className="header__list">
                            <li className="header__list-item"><a href="#">О чем</a></li>
                            <li className="header__list-item"><a href="#">Как мы работаем</a></li>
                            <li className="header__list-item"><a href="#">Достоинства</a></li>
                            <li className="header__list-item"><a href="#">Тарифы</a></li>
                        </ul>
                    </div>
                    <div className="header__right">
                        <a href="#">Воспользоваться NIH</a>
                        <div onClick={handleBurger} className={`burger ${active ? "active" : ""}`}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={`mobile__menu ${active ? "active" : ""}`}>
                    <ul className="header__list--alt">
                        <li className="header__list-item"><a href="#">О чем</a></li>
                        <li className="header__list-item"><a href="#">Как мы работаем</a></li>
                        <li className="header__list-item"><a href="#">Достоинства</a></li>
                        <li className="header__list-item"><a href="#">Тарифы</a></li>
                    </ul>
                    <div className="mobile__under">
                        <a href="#">Воспользоваться NIH</a>
                    </div>
                </div>
            </div>
        </header>
    )
}
