import classes from "./SendButton.module.css"
import sendIcon from "../../../assets/images/send.svg"
export default function SendButton() {
    return (
        <div className={classes.send}>
            <img src={sendIcon} alt="send" />
        </div>
    )
}
