import "./Pred.css"
import award from "../../../assets/images/landing/pred.webp"
export default function Pred() {
  return (
    <section id="pred" className="pred">
        <div className="container">
            <div className="pred__body">
                <div className="pred__image">
                    <img src={award} alt="award" />
                </div>
                <div className="pred__textbox">
                    <h2 className="pred__title">Прогноз конверсии</h2>
                    <p className="pred__text">Цена вашего продукта 25.000₽</p>
                    <ul className="pred__list">
                        <li className="pred__list-item">Более 80% переходов по ссылке</li>
                        <li className="pred__list-item">Более 1% покупают продукт</li>
                    </ul>
                    <div className="pred__stat">
                        Пример расчета <br />
                        Цена вашего продукта 25.000💰<br />
                        Вы выбрали 50.000 диалогов 💬<br />
                        Более 39.000 клиентов перешли по ссылке 🔗<br />
                        Более 500 клиентов купили продукт ✅
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
