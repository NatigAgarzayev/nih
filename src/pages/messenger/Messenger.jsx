import { useEffect, useRef, useState } from 'react'
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import classes from "./Messenger.module.css"
import userProfileImg from "../../assets/images/Zatichka.jpg"
import Input from '../../components/ui/input/Input'
import SendButton from '../../components/ui/sendButton/SendButton'
import Message from '../../components/ui/message/Message'
import { useParams } from 'react-router-dom'
import { useGetMessagesById, useSendAiMessage, useSendMessageByClient } from '../../api/messenger/queries'
import botIcon from "../../assets/images/bot.svg"
import pendingIcon from "../../assets/images/pendingIcon.svg"
import Moment from 'react-moment'
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import ServerError from "../../components/serverError/ServerError.jsx"
export default function Messenger() {

    const {chat_id} = useParams()

    const {data: messagesByIdData, isLoading: messagesByIdLoading, isError: messagesByIdError} = useGetMessagesById(chat_id)
    const {mutate: sendMessageByClientMutate, isPending: sendMessageByClientPending } = useSendMessageByClient(chat_id)
    const {mutate: sendAiMessageMutate, isPending: sendAiMessagePending} = useSendAiMessage(chat_id)
    const [dataSet, setDataSet] = useState([])

    const [inputValue, setInputValue] = useState("")
    const [times, setTimes] = useState(1)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const scrollContainer = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        setDataSet(messagesByIdData)
    }, [messagesByIdData])

    useEffect(() => {
        if(messagesByIdData){
            if(times === 1){
                scrollToBottom()
                setTimes(0)
            }
            else{
                const element = scrollContainer.current
                const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
                if(atBottom) scrollToBottom()
            }
        }
    }, [messagesByIdData])

    const sendMessage = (e) => {
        e.preventDefault()
        scrollToBottom()
       /*  const mess = {
            sent: "manually_added_to_the_arr",
            message: inputValue,
            telegram_message_id: dataSet.messages[dataSet.messages.length - 1].telegram_message_id + 1,
            role: "customer",
            time: new Date()
        }

        const copyArr = dataSet

        copyArr.messages.push(mess)
        console.log("copy_arr =", copyArr)

        setDataSet(copyArr) */

        sendMessageByClientMutate({
            chat_id,
            message: inputValue
        })
    }

    const handleSendAiMessage = () => {
        scrollToBottom()
        const clientName = dataSet?.full_name?.split(" ")[1] === "None" ? dataSet?.full_name?.split(" ")[0] : dataSet.full_name
        sendAiMessageMutate({
            chat_id: chat_id + "",
            client_name: clientName
        })
    }

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
                    <h3>{messagesByIdLoading && "Получение имени.."}{dataSet?.full_name?.split(" ")[1] === "None" ? dataSet?.full_name?.split(" ")[0] : dataSet?.full_name}</h3>
                    <div className={classes.textBox}>
                        <p>{messagesByIdLoading && "Получение id.."}{dataSet?.username ? `@${dataSet?.username}` : dataSet?.full_name}</p>
                        <p>{messagesByIdLoading && "Получение источника.."}{dataSet?.source_identity}</p>
                        <p>
                            <Moment format="DD MMM HH:mm" date={dataSet?.created_at}/>
                        </p>
                    </div>
                </div>
                <div className={classes.userChat}>
                    <div ref={scrollContainer} className={classes.chatContent}>
                        {
                            dataSet?.messages?.length !== 0?
                            messagesByIdLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                            messagesByIdError ? <ServerError /> :
                            <>
                                {
                                    dataSet?.messages
                                    ?.sort((a, b) => a.telegram_message_id - b.telegram_message_id)
                                    .map(item => (
                                        <Message key={item?.message_id} role={item?.role} position={item?.role === "customer" || item.role === "assistant" ? 1 : 0} message={item?.message} profileImage={""} time={item?.created_at} />
                                    ))
                                }
                                <div ref={messagesEndRef} />
                            </>
                            :
                            <div className={classes.noMessages}>Пока что нет сообщений</div>
                        }
                    </div>
                    <form onSubmit={sendMessage} className={classes.chatToolbar}>
                        <div ref={inputRef}>
                            <Input disabled={sendMessageByClientPending || sendAiMessagePending || messagesByIdLoading || messagesByIdError} setValue={setInputValue} placeholder={"Введите ваше сообщение"} />
                        </div>
                        <button disabled={false} onClick={handleSendAiMessage} className={classes.botMessage} type='button'>
                            <img src={sendAiMessagePending ? pendingIcon : botIcon} alt="Send AI message" />
                        </button>
                        <button disabled={messagesByIdLoading || sendMessageByClientPending} className={classes.enterButton} type="submit">
                            <SendButton isPending={sendMessageByClientPending}/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
