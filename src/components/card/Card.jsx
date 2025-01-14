import classes from "./Card.module.css"
import InnerCard from "./innerCard/InnerCard"
import { Droppable } from "react-beautiful-dnd"
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import ServerError from "../serverError/ServerError"
export default function Card({isError, loading, drop, innerCards }) {
    return (
        <Droppable
            droppableId={drop}
        >
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={classes.card}>
                        {
                            innerCards?.length > 0 ?
                            innerCards?.map((item, index) => (
                                <InnerCard key={item.participant_id} cardInfo={item} index={index} />
                            ))
                            :
                            loading ? <img className="pendingIcon" src={pendingIconBlack} alt="Loading..." /> : 
                            isError ? <ServerError /> :
                            <div className={classes.noData}>Пусто</div>
                        }
                        {
                            provided.placeholder
                        }
                    </div>
                )
            }
        </Droppable>
    )
}
