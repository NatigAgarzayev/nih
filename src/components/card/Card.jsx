import classes from "./Card.module.css"
import InnerCard from "./innerCard/InnerCard"
import { Droppable } from "react-beautiful-dnd"
export default function Card({ innerCards }) {
    return (
        <Droppable
            droppableId={innerCards.column_id}
        >
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={classes.card}>
                        {
                            innerCards?.data.map((item, index) => (
                                <InnerCard key={item.id} cardInfo={item} index={index} />
                            ))
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
