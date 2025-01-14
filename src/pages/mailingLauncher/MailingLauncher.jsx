import { useEffect, useRef, useState } from 'react'
import classes from "./MailingLauncher.module.css"
import ReturnPage from '../../components/ui/returnPage/ReturnPage'
import SearchInput from '../../components/ui/searchInput/SearchInput'
import ReactButton from '../../components/ui/reactButton/ReactButton'
import Message from '../../components/ui/message/Message'
import Logo from '../../components/ui/logo/Logo'
import Input from '../../components/ui/input/Input'
import MailingCards from '../../components/mailingCards/MailingCards'
import scriptIcon from "../../assets/images/script.svg"
import botIcon from "../../assets/images/bot.svg"
import Textarea from '../../components/ui/textarea/Textarea'
import Cookies from 'js-cookie'
import { useGetNewsletterParticipants, useLaunchNewsletter } from '../../api/mailing/queries'
import Notfound from '../../components/notfound/Notfound'
import pendingIconBlack from "../../assets/images/pendingIconBlack.svg"
import promptIcon from "../../assets/images/prompt.svg"
import triggerIcon from "../../assets/images/trigger-link.svg"
import { useNavigate } from 'react-router-dom'
import ServerError from '../../components/serverError/ServerError'

export default function MailingLauncher() {

    const [newsletterId, setNewsletterId] = useState(Cookies.get("newsletter_id"))
    const [newsletterTitle, setNewsletterTitle] = useState("")
    const [savedTitle, setSavedTitle] = useState("")
    const [prompt, setPrompt] = useState("")
    const [trigger, setTrigger] = useState("")
    useEffect(() => {
        newsletterParticipantRefetch()
        const cookieTitle = Cookies.get("newsletter_title")
        if(cookieTitle){
            setSavedTitle(cookieTitle)
            setNewsletterTitle(cookieTitle)
        }
    }, [])

    const [search, setSearch] = useState("")
    const [sendMessage, setSendMessage] = useState("")

    const [chosenCard, setChosenCard] = useState(0)

    const [scriptOpened, setScriptOpened] = useState(false)
    const [botOpened, setBotOpened] = useState(false)
    const [promptOpened, setPromptOpened] = useState(false)
    const [triggerOpened, setTriggerOpened] = useState(false)
    const {data: newsletterParticipantData, isLoading: newsletterParticipantLoading, refetch: newsletterParticipantRefetch, isError: newsletterParticipantError} = useGetNewsletterParticipants(newsletterId)
    const {mutate: launchNewsletterMutate, isPending: launchNewsletterPending, isError: launchNewsletterError, isSuccess: launchNewsletterSuccess} = useLaunchNewsletter()
    const nav = useNavigate()
    useEffect(() => {
        if(launchNewsletterSuccess){
            nav("/nih/mailing")
        }
    }, [launchNewsletterSuccess])
    
    const refFocusInput = useRef(null)
    const handleMailingLauncher = () => {
        if(sendMessage.trim() === "") {
            refFocusInput.current.childNodes[0].focus()
            return
        }
        if(prompt.trim() === ""){
            setPromptOpened(true)
            return
        }
        if(trigger.trim() === ""){
            setTriggerOpened(true)
            return
        }
        const getTitle = Cookies.get("newsletter_title")
        launchNewsletterMutate({
            title: getTitle ? getTitle : `Mailing №${newsletterId}`,
            message_pattern: sendMessage,
            newsletter_id: newsletterId,
            triggered_link: trigger,
            prompt_message: prompt
        })
    }
    const handleSaveNewsletterTitle = () => {
        if(newsletterTitle.trim() !== ""){
            Cookies.set("newsletter_title", newsletterTitle + "")
            setSavedTitle(newsletterTitle)
            setTimeout(() => {
                setBotOpened(false)
            }, 100)
        }
        else{
            alert("Пожалуйста введите название рассылки для послдующего храниения.")
        }
    }

    return (
        <div className={classes.flexing}>
            {
                (scriptOpened || botOpened || promptOpened || triggerOpened) && <div onClick={() => { setScriptOpened(false), setBotOpened(false), setPromptOpened(false), setTriggerOpened(false) }} className="overlay"></div>
            }
            <div className={`${classes.toolsPanel} flex`}>
                <div className={`${classes.toolsKit} flex`}>
                    <ReturnPage />
                    <SearchInput
                        value={search}
                        setData={setSearch}
                    />
                </div>
            </div>
            <div className={classes.parser}>
                <div className={classes.autoParsing}>
                    <ul className={classes.parserContent}>
                        {
                            newsletterParticipantData?.participants.length !== 0 && newsletterId ? 
                            newsletterParticipantLoading ? <img className='pendingIcon' src={pendingIconBlack} alt="Loading..." /> : 
                            newsletterParticipantError ? <ServerError /> :
                            newsletterParticipantData?.participants
                                .filter(item => item.full_name.toLowerCase().includes(search.toLowerCase()))
                                .map(item => (
                                    <li onClick={() => setChosenCard(item.participant_id)} key={item.participant_id}>
                                        <MailingCards participantData={item} active={chosenCard === item.participant_id ? true : false} id={item.participant_id} />
                                    </li>
                                ))
                                :
                                <Notfound link={"/nih/parsing-launcher"} content={"Сперва запустите парсер"} />
                        }
                    </ul>
                    <div className={classes.chatToolbar}>
                        <div ref={refFocusInput}>
                            <Input disabled={false} value={sendMessage} setValue={setSendMessage} placeholder={"Введите ваш запрос"} />
                        </div>
                        <div className={classes.multipleSend}>
                            <div onClick={() => setScriptOpened(true)} className={classes.script}>
                                <img src={scriptIcon} alt="" />
                                {
                                    scriptOpened && (
                                        <ul className={classes.preferences}>
                                            <li onClick={() => setSendMessage(curr => curr + " {first_name} ")}>{`{Имя}`}</li>
                                            <li onClick={() => setSendMessage(curr => curr + " {last_name} ")}>{`{Фамилия}`}</li>
                                            <li onClick={() => setSendMessage(curr => curr + " {source} ")}>{`{Источник}`}</li>
                                            <li onClick={() => setSendMessage(curr => curr + " <Значение_1|Занчение_2> ")}>{`<Несколько вариантов>`}</li>
                                        </ul>

                                    )
                                }
                            </div>
                            <div onClick={() => setBotOpened(true)} className={classes.bot}>
                                <img src={botIcon} alt="" />
                                {
                                    botOpened && (
                                        <div className={classes.texting}>
                                            <div>
                                                <Textarea maxLength={20} cookie={savedTitle} setData={setNewsletterTitle} row={1} placeholder={"Введите название рассылки"} />
                                            </div>
                                            <div onClick={handleSaveNewsletterTitle}>
                                                <ReactButton disabled={newsletterTitle?.trim() === "" && true} content={"Сохранить"} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div onClick={() => setPromptOpened(true)} className={classes.prompt}>
                                <img src={promptIcon} alt="prompt" />
                                {
                                    promptOpened && (
                                        <div className={classes.promptContent}>
                                            <Textarea maxLength={256} data={prompt} setData={setPrompt} placeholder={"Вставьте ваш промпт для ИИ..."}/>
                                            <small>{prompt?.split("").length}/256</small>
                                        </div>
                                    )
                                }
                            </div>
                            <div onClick={() => setTriggerOpened(true)} className={classes.trigger}>
                                <img src={triggerIcon} alt="trigger" />
                                {
                                    triggerOpened && (
                                        <div className={classes.triggerContent}>
                                            <Textarea row={1} data={trigger} setData={setTrigger} placeholder={"Вставьте вашу триггер ссылку..."}/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.manualParsing}>
                    <div className={classes.exampleMessage}>
                        <div>
                            <Message position={0} message={"<Привет|Здарова|Салам|Добрый вечер>, {Имя}! Ты тоже подписан на канал/группу {Источник}. Слушай, у меня <вопрос|предложение>..."} />
                        </div>
                        <Logo w={78} h={78} src={""} />
                    </div>
                    <div onClick={handleMailingLauncher} className={classes.buttonLaunch}>
                        <ReactButton isError={launchNewsletterError} disabled={newsletterParticipantLoading || launchNewsletterPending || !newsletterParticipantData?.participants ? true : false} content={launchNewsletterPending ? "Рассылка..." : launchNewsletterError ? "Попробуйте снова" : "Запуск"} />
                    </div>
                </div>
            </div>
        </div >
    )
}
