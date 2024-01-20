import React, { useState } from 'react'
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import classes from "./Messenger.module.css"
import userProfileImg from "../../assets/images/profile.jpg"
import Input from '../../components/ui/input/Input'
import Attachment from '../../components/attachment/Attachment'
import SendButton from '../../components/ui/sendButton/SendButton'
import messageData from "../../components/utils/parser"
export default function Messenger() {

    const [inputValue, setInputValue] = useState("")

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
                            messageData?.map(item => (
                                <div style={{ display: "flex", justifyContent: item.id % 2 === 1 ? "flex-end" : 'flex-start' }} key={item.id}>
                                    Salam
                                </div>
                            ))
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
