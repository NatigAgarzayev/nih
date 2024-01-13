import Header from "../header/Header"
import { Outlet } from 'react-router-dom'
import classes from "./Layout.module.css"
export default function Layout() {
    return (
        <div className={classes.container}>
            <Header />
            <Outlet />
        </div>
    )
}
