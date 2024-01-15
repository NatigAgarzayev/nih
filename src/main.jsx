import ReactDOM from 'react-dom/client'
import './index.css'
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
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
