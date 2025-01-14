import classes from "./Button.module.css"
import { Link } from 'react-router-dom'
export default function Button({ link, content }) {
    return (
        <Link to={link}>
            <div className={classes.button}>
                {content}
            </div>
        </Link>
    )
}
