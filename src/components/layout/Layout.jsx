import Header from "../header/Header"
import { Outlet } from 'react-router-dom'
import classes from "./Layout.module.css"
export default function Layout() {
    return (
        <div className={classes.container}>
            <div className={classes.flexing}>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}
