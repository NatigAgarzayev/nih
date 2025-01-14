import "./Landing.css"
import Advn from "./adv/Advn"
import Footer from "./footer/Footer"
import Header from './header/Header'
import Hero from "./hero/Hero"
import Pred from "./pred/Pred"
import Reqform from "./reqform/Reqform"
import Stats from "./stats/Stats"
import Tarif from "./tarif/Tarif"
import Test from "./test/Test"
import Work from "./work/Work"
export default function Landing() {
  return (
    <div className="landing">
        <Header />
        <Hero />
        <Work />
        <Stats />
        <Advn />
        <Test />
        <Pred />
        {/* <Tarif /> */}
        <Reqform />
        <Footer />
    </div>
  )
}