import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './pages/Login.tsx'
import {createRoutesFromElements, Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Nav from './components/Nav.tsx'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import Home from './pages/Home.tsx'


const router = createBrowserRouter(createRoutesFromElements(

    <Route>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/' element={<Nav/>}>
        <Route path='/home' element={<Home></Home>}></Route>

      </Route>
    </Route>

 

))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
