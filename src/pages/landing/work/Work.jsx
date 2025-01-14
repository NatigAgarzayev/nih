import "./Work.css"
import workImg from "../../../assets/images/landing/work.webp"
export default function Work() {
  return (
    <section id="work" className="work">
        <div className="container">
            <div className="work__body">
                <div className="work__textbox">
                    <h2>Как мы работаем?</h2>
                    <p>Наш сервис собирает данные целевой аудитории из Telegram и позволяет управлять ими через CRM, отправляет им персонализированные сообщения с использованием нейронных сетей, которые после проведения диалога проводят клиента по продажной воронке, тем самым привлекая внимание к продукту и увеличивая конверсию переходови самих продаж.</p>
                </div>
                <div className="work__image">
                    <img src={workImg} alt="work" />
                </div>
            </div>
        </div>
    </section>
  )
}
