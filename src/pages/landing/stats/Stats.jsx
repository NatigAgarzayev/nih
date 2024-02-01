import "./Stats.css"
import img1 from "../../../assets/images/landing/stats-1.webp"
import img2 from "../../../assets/images/landing/stats-2.webp"
import img3 from "../../../assets/images/landing/stats-3.webp"
import img4 from "../../../assets/images/landing/stats-4.webp"
export default function Stats() {
  return (
    <section className="stats">
        <div className="container">
            <div className="stats__body">
                <h2 className="stats__title">Наши показетели в месяц</h2>
                <div className="stats__grid">
                    <div className="stats__grid-item">
                        <div className="stats__image">
                            <img src={img1} alt="img1" />
                        </div>
                        <div className="stats__grid-textbox">
                            <h4>Более 250.000</h4>
                            <p>собранных целевых клиентов из различных тематических групп/каналов в Telegram</p>
                        </div>
                    </div>
                    <div className="stats__grid-item">
                        <div className="stats__image">
                            <img src={img2} alt="img2" />
                        </div>
                        <div className="stats__grid-textbox">
                            <h4>Более 346.000</h4>
                            <p>проведенных с ними прогревающих диалогов на основе ИИ</p>
                        </div>
                    </div>
                    <div className="stats__grid-item">
                        <div className="stats__image">
                            <img src={img3} alt="img3" />
                        </div>
                        <div className="stats__grid-textbox">
                            <h4>Более 53.000</h4>
                            <p>переходов на ваш продукт</p>
                        </div>
                    </div>
                    <div className="stats__grid-item">
                        <div className="stats__image">
                            <img src={img4} alt="img4" />
                        </div>
                        <div className="stats__grid-textbox">
                            <h4>Более 9.200</h4>
                            <p>продаж в мес с помощью нашего инструмента</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
