import React, { useState } from 'react'
import classes from "./MailingLauncher.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import Select from '../../components/ui/select/Select'
import parsingLauncherData from "../../components/utils/parser"
import ReactButton from '../../components/ui/reactButton/ReactButton'
import Message from '../../components/ui/message/Message'
import Logo from '../../components/ui/logo/Logo'
import Attachment from '../../components/attachment/Attachment'
import Input from '../../components/ui/input/Input'
import MailingCards from '../../components/mailingCards/MailingCards'
import LinkButton from '../../components/ui/linkButton/LinkButton'
import scriptIcon from "../../assets/images/script.svg"
import botIcon from "../../assets/images/bot.svg"
import sendIcon from "../../assets/images/send.svg"
import Checkbox from '../../components/ui/checkbox/Checkbox'
import Textarea from '../../components/ui/textarea/Textarea'
import { useMutation } from '@tanstack/react-query'
import { useLauchMailing } from '../../api/mailing/queries'

export default function MailingLauncher() {

    const options = [
        { value: "by_subs", label: "Сортировать по кол-ву подписчиков" },
    ]

    const {mutate: lauchMailingMutate, isPending: launchMailingPending, isError: lauchMailingError} = useLauchMailing()

    const [search, setSearch] = useState("")
    const [option, setOption] = useState("") // chosen option from Select
    const [sendMessage, setSendMessage] = useState("")

    const [chosenCard, setChosenCard] = useState(0)

    const [scriptOpened, setScriptOpened] = useState(false)
    const [botOpened, setBotOpened] = useState(false)

    const handleMailingLauncher = () => {
        console.log('asdasd')
        lauchMailingMutate(sendMessage)
    }

    return (
        <div className={classes.flexing}>
            {
                (scriptOpened || botOpened) && <div onClick={() => { setScriptOpened(false), setBotOpened(false) }} className="overlay"></div>
            }
            <div className={`${classes.toolsPanel} flex`}>
                <div className={`${classes.toolsKit} flex`}>
                    <ReturnPage />
                    <SearchInput
                        value={search}
                        setData={setSearch}
                    />
                    <LinkButton link={"/nih/mailing-launcher"} content={"Добавить"} />
                </div>
                <div>
                    <Select options={options} setValue={setOption} />
                </div>
            </div>
            <div className={classes.parser}>
                <div className={classes.autoParsing}>
                    <ul className={classes.parserContent}>
                        {
                            parsingLauncherData.map(item => (
                                <li onClick={() => setChosenCard(item.id)} key={item.id}>
                                    <MailingCards active={chosenCard === item.id ? true : false} id={item.id} />
                                </li>
                            ))
                        }
                    </ul>
                    <div className={classes.chatToolbar}>
                        {/* <div>
                            <Attachment />
                        </div> */}
                        <div>
                            <Input disabled={launchMailingPending} value={sendMessage} setValue={setSendMessage} placeholder={"Введите ваш запрос"} />
                        </div>
                        <div className={classes.multipleSend}>
                            <div onClick={() => setScriptOpened(true)} className={classes.script}>
                                <img src={scriptIcon} alt="" />
                                {
                                    scriptOpened && (
                                        <ul className={classes.preferences}>
                                            <li onClick={() => setSendMessage(curr => curr + " {Имя} ")}>{`{Имя}`}</li>
                                            <li onClick={() => setSendMessage(curr => curr + " {Фамилия} ")}>{`{Фамилия}`}</li>
                                            <li onClick={() => setSendMessage(curr => curr + " {Источник} ")}>{`{Источник}`}</li>
                                        </ul>

                                    )
                                }
                            </div>
                            <div onClick={() => setBotOpened(true)} className={classes.bot}>
                                <img src={botIcon} alt="" />
                                {
                                    botOpened && (
                                        <div className={classes.texting}>
                                            <div className={classes.checkboxLabel}>
                                                <label htmlFor="0"></label>
                                                <div className="flex">
                                                    <p>Название</p>
                                                    <Checkbox id={0} />
                                                </div>
                                            </div>
                                            <div>
                                                <Textarea row={3} />
                                            </div>
                                            <div>
                                                <Textarea row={1} placeholder={"Введите еще один текст"} />
                                            </div>
                                            <div>
                                                <ReactButton content={"Сохранить"} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={classes.send}>
                                <img src={sendIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.manualParsing}>
                    <div className={classes.exampleMessage}>
                        <div>
                            <Message position={0} message={"Привет, {Имя}! Ты тоже подписан на канал {Источник}. Слушай, у меня вопрос ..."} />
                        </div>
                        <Logo w={78} h={78} src={""} />
                    </div>
                    <div onClick={handleMailingLauncher} className={classes.buttonLaunch}>
                        <ReactButton disabled={launchMailingPending} content={lauchMailingError ? "Failed, Try again" : "Запуск"} />
                    </div>
                </div>
            </div>
        </div >
    )
}
