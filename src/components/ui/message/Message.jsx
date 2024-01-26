import classes from "./Message.module.css"
import Logo from "../logo/Logo"
export default function Message({ position, message, profileImage, time }) {

    return (
        <div className={`${classes.messageContent} ${position === 0 ? classes.left : classes.right}`}>

            {
                profileImage && <div>
                    <Logo w={32} h={32} src={profileImage} />
                </div>
            }
            <div className={classes.messageItem}>
                <p>{message}</p>
                {
                    time &&
                    <div className={classes.messageDate}>
                        <p>{time}</p>
                    </div>
                }
            </div>
        </div>
    )
}
