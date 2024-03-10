import { Link } from "react-router-dom"
import "./Test.css"
export default function Test() {
  return (
    <section className="test">
        <div className="container">
            <div className="test__body">
                <h2 className="test__title">Тестирование</h2>
                <p className="test__text">Все шаги (от поиска клиента до продажи ему продукта) за вас сделает наш бот</p>
                <Link className="test__btn" to="/nih">Перейти в сервис NIH</Link>
            </div>
        </div>
    </section>
  )
}
