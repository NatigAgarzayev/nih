import { useEffect, useRef, useState } from 'react'
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import classes from "./Messenger.module.css"
import userProfileImg from "../../assets/images/profile.jpg"
import Input from '../../components/ui/input/Input'
import Attachment from '../../components/attachment/Attachment'
import SendButton from '../../components/ui/sendButton/SendButton'
import messages from "../../components/utils/messages"
import Message from '../../components/ui/message/Message'
export default function Messenger() {

    const [inputValue, setInputValue] = useState("")
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div>
            <div className={classes.toolkit}>
                <ReturnPage />
            </div>
            <div className={classes.chat}>
                <div className={classes.userProfile}>
                    <div className={classes.profileImage}>
                        <img src={userProfileImg} alt="profile image" />
                    </div>
                    <h3>Алексей</h3>
                    <div className={classes.textBox}>
                        <p>@nickname</p>
                        <p>Источник</p>
                        <p>Дата</p>
                    </div>
                </div>
                <div className={classes.userChat}>
                    <div className={classes.chatContent}>
                        {
                            <>
                                {
                                    messages?.map(item => (
                                        item.user === "client" ?
                                            <Message key={item.id} position={0} message={item.message} profileImage={""} time={item.time} />
                                            :
                                            <Message key={item.id} position={1} message={item.message} profileImage={""} time={item.time} />
                                    ))
                                }
                                <div ref={messagesEndRef} />
                            </>
                        }
                    </div>
                    <div className={classes.chatToolbar}>
                        <div>
                            <Attachment />
                        </div>
                        <div>
                            <Input value={inputValue} setValue={setInputValue} placeholder={"Введите ваше сообщение"} />
                        </div>
                        <div>
                            <SendButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
