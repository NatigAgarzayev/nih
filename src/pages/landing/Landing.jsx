import "./Landing.css"
import Advn from "./adv/Advn"
import Header from './header/Header'
import Hero from "./hero/Hero"
import Stats from "./stats/Stats"
import Work from "./work/Work"
export default function Landing() {
  return (
    <div className="landing">
        <Header />
        <Hero />
        <Work />
        <Stats />
        <Advn />
    </div>
  )
}