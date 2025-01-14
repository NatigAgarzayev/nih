import { DragDropContext } from "react-beautiful-dnd";
import Card from "../../components/card/Card";
import classes from "./Kanban.module.css"
import { useGetKanban, useUpdateStatus, useUpdateTicketStatuses } from "../../api/kanban/queries";
import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import upadateTicketIcon from "../../assets/images/update-ticket.svg"
export default function Kanban() {

    const {data: kanbanData, isLoading: kanbanLoading, isError: kanbanError} = useGetKanban()
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [storage, setStorage] = useState([])
    const {mutate: updateStatusMutate } = useUpdateStatus()
    const {mutate: updateTicketStatusesMutate, isError: updateTicketStatusesError, isSuccess: updateTicketStatusesSuccess} = useUpdateTicketStatuses()

    useEffect(() => {
        setTimeout(() => {
            updateTicketStatusesMutate()
        }, 800)
    }, [])

    useEffect(() => {
        if(kanbanData){
            setStorage(kanbanData?.progress_tickets)
        }
    }, [kanbanData])

    const move = (list, stepName, elementId) => {
        const newArray = list
        let needObj
        for(let i = 0; i < newArray.length; i++){
            if(newArray[i].participant_id == elementId){
                needObj = newArray[i]
                newArray.splice(i, 1)
                break
            }
        }
        needObj.progress_ticket_status = stepName
        newArray.push(needObj)
        setStorage(newArray)
        forceUpdate()
        updateStatusMutate({
            progress_ticket_id: needObj.progress_ticket_id,
            status: stepName
        })
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        if (!destination) return
        
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        if(destination.droppableId === "droppable1"){
            move(storage, "FIRST_MESSAGE", draggableId, )
        }
        else if(destination.droppableId === "droppable2"){
            move(storage, "CLIENT_RESPONDED", draggableId, )
        }
        else if(destination.droppableId === "droppable3"){
            move(storage, "DIALOGUE_STARTED", draggableId, )
        }
        else if(destination.droppableId === "droppable4"){
            move(storage, "CLIENT_BOUGHT", draggableId, )
        }
    }

    const handleUpdateTicketStatuses = () => {
        updateTicketStatusesMutate()
    }

    return (
        <>
            <div onClick={handleUpdateTicketStatuses} className={`${classes.updateTicket} ${updateTicketStatusesError ? classes.error : null} ${updateTicketStatusesSuccess ? classes.success : null}`}>
                <img src={upadateTicketIcon} alt="update" />
            </div>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className={classes.kanban}>
                    <div className={classes.wrapper}>
                        <p className={classes.title}>Первое сообщение: {storage.length === 0 ? 0 : storage?.filter(item => item.progress_ticket_status === "FIRST_MESSAGE").length}</p>
                        <div className={classes.card}>
                            <Card isError={kanbanError} loading={kanbanLoading} drop={"droppable1"} innerCards={storage?.filter(item => item.progress_ticket_status === "FIRST_MESSAGE")} />
                        </div>
                    </div>
                    <div className={classes.wrapper}>
                        <p className={classes.title}>Клиент ответил: {storage.length === 0 ? 0 : storage?.filter(item => item.progress_ticket_status === "CLIENT_RESPONDED").length}</p>
                        <div className={classes.card}>
                            <Card isError={kanbanError} loading={kanbanLoading} drop={"droppable2"} innerCards={storage?.filter(item => item.progress_ticket_status === "CLIENT_RESPONDED")} />
                        </div>
                    </div>
                    <div className={classes.wrapper}>
                        <p className={classes.title}>ИИ вступило в диалог: {storage.length === 0 ? 0 : storage?.filter(item => item.progress_ticket_status === "DIALOGUE_STARTED").length}</p>
                        <div className={classes.card}>
                            <Card isError={kanbanError} loading={kanbanLoading} drop={"droppable3"} innerCards={storage?.filter(item => item.progress_ticket_status === "DIALOGUE_STARTED")} />
                        </div>
                    </div>
                    <div className={classes.wrapper}>
                        <p className={classes.title}>Клиент получил ссылку: {storage.length === 0 ? 0 : storage?.filter(item => item.progress_ticket_status === "CLIENT_BOUGHT").length}</p>
                        <div className={classes.card}>
                            <Card isError={kanbanError} loading={kanbanLoading} drop={"droppable4"} innerCards={storage?.filter(item => item.progress_ticket_status === "CLIENT_BOUGHT")} />
                        </div>
                    </div>
                </div>
            </DragDropContext>
        </>
    )
}
