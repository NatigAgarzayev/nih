import { Link } from "react-router-dom"
import "./Test.css"
export default function Test() {
  return (
    <section className="test">
        <div className="container">
            <div className="test__body">
                <h2 className="test__title">Тестирование</h2>
                <p className="test__text">Вы сможете удостовериться в работе нашего продукта с помощью демо-версии и самостоятельно опробовать каждый шаг NIH bot</p>
                <Link className="test__btn" to="/nih">Перейти в сервис NIH</Link>
            </div>
        </div>
    </section>
  )
}
