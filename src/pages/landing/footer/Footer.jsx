import "./Footer.css"
export default function Footer() {
  return (
    <footer className="footer">
        <div className="container">
                <div className="footer__body">
                    <div className="footer__left">
                        <div className="footer__logo">NIH</div>
                        <ul className="footer__list">
                            <li className="footer__list-item"><a href="#">О чем</a></li>
                            <li className="footer__list-item"><a href="#">Как мы работаем</a></li>
                            <li className="footer__list-item"><a href="#">Достоинства</a></li>
                            <li className="footer__list-item"><a href="#">Тарифы</a></li>
                        </ul>
                    </div>
                    <div className="footer__right">
                        <p className="footer__right-1">Политика конфиденциальности NIH</p>
                        <p className="footer__right-2">NIH ©  Все права защищены</p>
                    </div>
                </div>
            </div>
    </footer>
  )
}
