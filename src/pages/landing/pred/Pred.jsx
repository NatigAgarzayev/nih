import "./Pred.css"
import award from "../../../assets/images/landing/pred.webp"
export default function Pred() {
  return (
    <section className="pred">
        <div className="container">
            <div className="pred__body">
                <div className="pred__image">
                    <img src={award} alt="award" />
                </div>
                <div className="pred__textbox">
                    <h2 className="pred__title">Прогноз конверсии</h2>
                    <p className="pred__text">Цена вашего продукта 25.000₽</p>
                    <ul className="pred__list">
                        <li className="pred__list-item">Вы выбрали тариф 50.000 лидов</li>
                        <li className="pred__list-item">Конверсия продаж ~1,7% без учета отложенного спроса</li>
                    </ul>
                    <div className="pred__stat">
                        = 850(продаж)*25000₽=21.250.000₽-3.200.000₽ (цена тарифа)=18.050.000₽ ваша чистая прибыль
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
