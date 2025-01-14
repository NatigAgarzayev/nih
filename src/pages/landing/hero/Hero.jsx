import "./Hero.css"
import leftSh from "../../../assets/images/landing/intro-left-sh.webp"
import left from "../../../assets/images/landing/intro-left.webp"
import rightSh from "../../../assets/images/landing/intro-right-sh.webp"
import right from "../../../assets/images/landing/intro-right.webp"
export default function Hero() {
  return (
    <section id="hero" className="hero">
        <div className="container">
            <div className="hero__body">
                <div className="left__image">
                    <div>
                        <img className="left__img-1" src={left} alt="left" />                
                        <img className="left__img-2" src={leftSh} alt="left" />
                    </div>
                </div>
                <div className="right__image">
                    <div>
                        <img className="right__img-1" src={right} alt="right" />                
                        <img className="right__img-2" src={rightSh} alt="right" />
                    </div>
                </div>
                <div className="hero__textbox">
                    <h1 className="hero__title">NIH BOT -</h1>
                    <p className="hero__text">Уникальный маркетинговый инструмент, который способен повысить заинтересованность в вашем продукте и кратно увеличить обороты компании!</p>
                </div>
                {/* <div className="hero__form">
                    <input type="text" placeholder="Введите свой никнейм, чтобы пообщаться с ботом"/>
                    <button>Отправить</button>
                </div> */}
            </div>
        </div>
    </section>
  )
}
