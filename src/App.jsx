import './App.css'
import {
  createBrowserRouter,
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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Kanban />
      },
      {
        path: "/parser",
        element: <Parser />
      },
      {
        path: "/mailing",
        element: <Mailing />
      },
      {
        path: "/contacts",
        element: <Contacts />
      },
      {
        path: "/info-parser",
        element: < InfoParser />
      },
      {
        path: "/info-mailing",
        element: <InfoMailing />
      },
      {
        path: "/parsing-launcher",
        element: <ParsingLauncher />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/messenger",
        element: <Messenger />
      }
      ,
      {
        path: "/mailing-launcher",
        element: <MailingLauncher />
      }
    ]
  },
  {
    path: "/landing",
    element: <Landing />
  }
]);

function App() {

  const [isDesktop, setIsDesktop] = useState(true)

  const currentRoute = window.location.href.split("/")[3]
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    setIsDesktop(!isMobile)
  }, [])


  const queryClient = new QueryClient()
  return (
    (isDesktop || currentRoute) ?
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    :
    <IfMobile />
  )
}

export default App
