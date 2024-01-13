import Card from "../../components/card/Card";
import storage from "../../components/utils/storage.json"
import classes from "./Kanban.module.css"
export default function Kanban() {
    return (
        <div className={classes.kanban}>
            <div className={classes.wrapper}>
                <p className={classes.title}>Первое сообщение</p>
                <div className={classes.card}>
                    <Card innerCards={storage} />
                </div>
            </div>
            <div className={classes.wrapper}>
                <p className={classes.title}>Клиент ответил</p>
                <div className={classes.card}>
                    <Card innerCards={storage} />
                </div>
            </div>
            <div className={classes.wrapper}>
                <p className={classes.title}>ИИ вступило в диалог</p>
                <div className={classes.card}>
                    <Card innerCards={storage} />
                </div>
            </div>
            <div className={classes.wrapper}>
                <p className={classes.title}>Клиент купил</p>
                <div className={classes.card}>
                    <Card innerCards={storage} />
                </div>
            </div>
        </div>
    )
}
