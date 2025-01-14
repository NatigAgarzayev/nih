import classes from "./SendButton.module.css"
import sendIcon from "../../../assets/images/send.svg"
import pendingIcon from "../../../assets/images/pendingIcon.svg"
export default function SendButton({isPending}) {
    return (
        <div className={classes.send}>
            <img src={isPending ? pendingIcon : sendIcon} alt="send" />
        </div>
    )
}
