import "./Reqform.css"
export default function Reqform() {
  return (
    <section className="reqform">
        <div className="container">
            <div className="reqform__body">
                <h2 className="reqform__title">Оставьте заявку</h2>
                <div className="reqform__form">
                    <input className="reqform__input" type="text" placeholder="Введите ваше имя"/>
                    <input className="reqform__input" type="text" placeholder="Введите ваш ник в Telegram"/>
                    <button className="reqform__btn">Оставить заявку</button>
                </div>
            </div>
        </div>
    </section>
  )
}
