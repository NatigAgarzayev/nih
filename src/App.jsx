import './App.css'
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/layout/Layout.jsx';
import Kanban from './pages/main/Kanban.jsx';
import Parser from './pages/parser/Parser.jsx';
import Mailing from './pages/mailing/Mailing.jsx';
import Contacts from './pages/contacts/Contacts.jsx'
import InfoParser from './pages/infoParser/InfoParser.jsx'
import InfoMailing from './pages/infoMailing/InfoMailing.jsx';
import ParsingLauncher from './pages/parsingLauncher/ParsingLauncher.jsx';
import Profile from './pages/profile/Profile.jsx';
import Messenger from './pages/messenger/Messenger.jsx';
import { useEffect, useState } from 'react';
import IfMobile from './pages/ifMobile/IfMobile.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import MailingLauncher from './pages/mailingLauncher/MailingLauncher.jsx';
import Landing from './pages/landing/Landing.jsx';
import Cookies from 'js-cookie';
import ErrorPage from "./pages/errorPage/ErrorPage.jsx"

const router = createBrowserRouter([
  {
    path: "/nih",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/nih",
        element: <Kanban />
      },
      {
        path: "/nih/parser",
        element: <Parser />
      },
      {
        path: "/nih/mailing",
        element: <Mailing />
      },
      {
        path: "/nih/contacts",
        element: <Contacts />
      },
      {
        path: "/nih/info-parser/:id",
        element: <InfoParser />
      },
      {
        path: "/nih/info-mailing/:id",
        element: <InfoMailing />
      },
      {
        path: "/nih/parsing-launcher",
        element: <ParsingLauncher />
      },
      {
        path: "/nih/profile",
        element: <Profile/>
      },
      {
        path: "/nih/messenger/:chat_id",
        element: <Messenger />
      }
      ,
      {
        path: "/nih/mailing-launcher",
        element: <MailingLauncher />
      }
    ]
  },
  {
    path: "/",
    element: <Landing />
  }
]);

function App() {

  const [isDesktop, setIsDesktop] = useState(true)
  const currentRoute = window.location.href.split("/")[3]
  console.log("current tro", currentRoute)
  useEffect(() => {
    const isLogged = Cookies.get("logged_in")

    if(isLogged && isLogged === "1"){
      console.log("You're loged in")
    }
    else{
      if(currentRoute !== ""){
        window.location.href = "http://84.201.179.250:3000/oauth2/authorize"
      }
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    setIsDesktop(!isMobile)
  }, [])

  const queryClient = new QueryClient()
  return (
    (isDesktop && window.innerWidth >= 1024) || currentRoute === "" ?
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    :
    <IfMobile />
  )
}

export default App
