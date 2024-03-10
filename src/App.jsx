import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import IfMobile from './pages/ifMobile/IfMobile.jsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Landing from "./pages/landing/Landing"
const router = createBrowserRouter([
  {
    path: "/",
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

    const isLogged = Cookies.get("logged_in")

    if(isLogged && isLogged === "1"){
      console.log("You're loged in")
    }
    else{
      if(currentRoute !== ""){
        window.location.href = "http://84.201.179.250:3000/oauth2/authorize"
      }
    }
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
