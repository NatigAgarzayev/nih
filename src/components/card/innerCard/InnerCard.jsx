import classes from "./InnerCard.module.css"
import Logo from "../../ui/logo/Logo"

export default function InnerCard({ cardText }) {
    return (
        <div className={`${classes.card} flex`}>
            <Logo w={32} h={32} src={""} />
            <div className={classes.text}>{cardText}</div>
        </div>
    )
}
