import classes from "./InnerCard.module.css"
import Logo from "../../ui/logo/Logo"
import { Draggable } from "react-beautiful-dnd"
import { Link } from "react-router-dom"

export default function InnerCard({ cardInfo, index }) {
    return (
        <Draggable
            draggableId={cardInfo.participant_id.toString()}
            index={index}
            className={classes.cardDrop}
        >
            {
                (provided) => (

                    <Link to={`/nih/messenger/${cardInfo.chat_id}`}>
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} draggable={true} className={`${classes.cardInner} flex`}>
                            <Logo w={32} h={32} src={""} />
                            <div className={classes.text}>{cardInfo?.full_name}{cardInfo?.source_identity && ` | ${cardInfo?.source_identity}`}</div>
                        </div>
                    </Link>
                )
            }
        </Draggable>
    )
}   
