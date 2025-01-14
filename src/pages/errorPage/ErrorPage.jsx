import classes from "./ErrorPage.module.css"
import errorIcon from "../../assets/images/error-icon.svg"
import Button from '../../components/ui/button/Button'
export default function ErrorPage() {
  return (
    <div className={classes.overlay}>
        <img src={errorIcon} alt="Ошибка системы" />
        <h2>Системная ошибка</h2>
        <Button link={"/nih"} content={"Вернуться на главную"}/>
    </div>
  )
}
