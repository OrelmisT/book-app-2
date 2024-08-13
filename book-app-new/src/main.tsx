import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './pages/Login.tsx'
import {createRoutesFromElements, Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Nav from './components/Nav.tsx'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import Discussions from './pages/Discussions.tsx'
import Groups from './pages/Groups.tsx'
import Bookshelf from './pages/Bookshelf.tsx'
import Search from './pages/Search.tsx'
import Bookmarks from './pages/Bookmarks.tsx'
import {store} from './store/reduxstore.ts'
import {Provider} from 'react-redux'


const router = createBrowserRouter(createRoutesFromElements(

    <Route>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/' element={<Nav/>}>
        <Route index path='/discussions' element={<Discussions></Discussions>} />
        <Route path='/groups' element={<Groups></Groups>} />
        <Route path='/bookshelf' element={<Bookshelf></Bookshelf>} />
        <Route path='/search' element={<Search></Search>} />
        <Route path='/bookmarks' element={<Bookmarks></Bookmarks>} />

      </Route>
    </Route>

 

))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
