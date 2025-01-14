import leftSh from "../../../assets/images/landing/intro-left-sh.webp"
import left from "../../../assets/images/landing/intro-left.webp"
import rightSh from "../../../assets/images/landing/intro-right-sh.webp"
import right from "../../../assets/images/landing/intro-right.webp"
import infoIcon from "../../../assets/images/landing/info.svg"
import "./Advn.css"
export default function Advn() {
  return (
    <section id="advn" className="advn">
        <div className="container">
            <div className="advn__body">
                <div className="left__image adv__image">
                    <div>
                        <img className="left__img-1" src={left} alt="left" />                
                        <img className="left__img-2" src={leftSh} alt="left" />
                    </div>
                </div>
                <div className="right__image adv__image">
                    <div>
                        <img className="right__img-1" src={right} alt="right" />                
                        <img className="right__img-2" src={rightSh} alt="right" />
                    </div>
                </div>
                <h2 className="advn__title">Достоинства</h2>
                <div className="advn__flex">
                    <div className="advn__flex-item advn__div-1">
                        <h4>Колоссальная экономия времени</h4>
                        <p>Все шаги (от поиска клиента до продажи ему продукта) за вас сделает наш бот</p>
                    </div>
                    <div className="advn__flex-item advn__div-2">
                        <h4>Значительная экономия бюджета</h4>
                        <p>Наше решение позволит вам существенно сократить расходы, обеспечивая эффективное управление бюджетом без лишних затрат</p>
                    </div>
                </div>
                <div className="advn__flex-item advn__div-3">
                    <h4>NIH BOT — является единственным в своём роде на рынке СНГ, наш способ привлечения клиентов используют самые крупные компании России.</h4>
                    <p>Уникальное решение для рынка СНГ</p>
                </div>
                <div className="advn__info">
                    <div>
                        <img src={infoIcon} alt="info" />
                    </div>
                    <p>Мы — про высокую конверсию и эффективность с окупаемыми вложениями</p>
                </div>
            </div>
        </div>
    </section>
  )
}
