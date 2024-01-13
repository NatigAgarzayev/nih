import { DragDropContext } from "react-beautiful-dnd";
import Card from "../../components/card/Card";
import data from "../../components/utils/storage"
import classes from "./Kanban.module.css"
import { useState } from "react";
export default function Kanban() {

    const [storage, setStorage] = useState(data)

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <div className={classes.kanban}>
                <div className={classes.wrapper}>
                    <p className={classes.title}>Первое сообщение</p>
                    <div className={classes.card}>
                        <Card innerCards={storage.firstColumn} />
                    </div>
                </div>
                <div className={classes.wrapper}>
                    <p className={classes.title}>Клиент ответил</p>
                    <div className={classes.card}>
                        <Card innerCards={storage.secondColumn} />
                    </div>
                </div>
                <div className={classes.wrapper}>
                    <p className={classes.title}>ИИ вступило в диалог</p>
                    <div className={classes.card}>
                        <Card innerCards={storage.thirdColumn} />
                    </div>
                </div>
                <div className={classes.wrapper}>
                    <p className={classes.title}>Клиент купил</p>
                    <div className={classes.card}>
                        <Card innerCards={storage.fourthColumn} />
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}
