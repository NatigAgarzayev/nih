import classes from "./CheckboxCard.module.css"
import Logo from "../logo/Logo"
import Checkbox from '../checkbox/Checkbox'
export default function CheckboxCard({ checked, subsAmount, content, checkboxId, customClickEvent }) {
    return (
        <div className={classes.checkboxPricipal}>
            <label onClick={customClickEvent} htmlFor={checkboxId} className={`${classes.checkboxLabel}`}>
            </label>
            <div className={`${classes.checkbox} flex`}>
                <div className={`${classes.cahecboxFirstPart} flex`}>
                    <Logo w={32} h={32} src={""} />
                    <p className={classes.channelName}><span>{content}</span> <span className={classes.spanEl}>{subsAmount ? `| ${subsAmount}` : ""}</span></p>
                </div>

                <div>
                    <Checkbox checked={checked} id={checkboxId} />
                </div>
            </div>
        </div>

    )
}
