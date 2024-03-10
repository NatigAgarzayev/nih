import classes from "./Logo.module.css"
import logo from "../../../assets/images/Zatichka.jpg"
export default function Logo({ w, h, src }) {
    return (
        <div>
            <img className={classes.logo} src={src === "" ? `${logo}` : src} style={{ minWidth: w, height: h }} alt="" />
        </div>
    )
}
