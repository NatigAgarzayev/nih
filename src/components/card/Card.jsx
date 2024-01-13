import classes from "./Card.module.css"
import InnerCard from "./innerCard/InnerCard"
export default function Card({ innerCards }) {
    return (
        <div className={classes.card}>
            {
                innerCards?.map((item, index) => (
                    <InnerCard key={index} cardText={item.text} />
                ))
            }
        </div>
    )
}
