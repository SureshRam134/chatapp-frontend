import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'
import Chatting from './Components/Chatting'
import User from './Components/Layout'
import AccessDenied from './Components/AccessDenied'
import ProviedData from './context/ProviedData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProviedData>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<User />}>
            <Route index element={<Home />} />
            {/* <Route path='chatting' element={<Chatting />} /> */}
            <Route path='*' element={<AccessDenied />} />
          </Route>
          <Route path='*' element={<AccessDenied />} />
        </Routes>
      </ProviedData>
    </>
  )
}

export default App
