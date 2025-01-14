import classes from "./Message.module.css"
import Logo from "../logo/Logo"
import Moment from "react-moment"
export default function Message({role, position, message, profileImage, time }) {

    return (
        <div className={`${classes.messageContent} ${position === 0 ? classes.left : classes.right}`}>

            {
                profileImage && <div>
                    <Logo w={32} h={32} src={profileImage} />
                </div>
            }
            <div className={`${role === "customer" ? classes.customerMessage :  classes.messageItem}`}>
                <p>{message}</p>
                {
                    time &&
                    <div className={classes.messageDate}>
                        <p>
                            <Moment format="DD MMM HH:mm" date={time}/>
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}
