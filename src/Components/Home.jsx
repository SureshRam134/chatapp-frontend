import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Chatting from './Chatting'
import { useNavigate } from 'react-router-dom'
import axiosURL from '../api/AxiosURL'
import { useContext } from 'react'
import { ContextData } from '../context/ProviedData'
const Home = () => {
  const navigate = useNavigate()
  const { currentUserDetails } = useContext(ContextData)

  const getUserDataFunction = async () => {
    try {
      const res = await axiosURL.get('/api/user/getuser')
      const allUser = res.data.result
      if (allUser) {
        setUser((pre) => [...pre, allUser])
      }
    } catch (error) {
      console.log("Internal server error", error);
    }
  }
  useEffect(() => {
    getUserDataFunction()
  }, [])


  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [showScreen, setShowScreen] = useState(false)


  const currentUserData = (data) => {
    setCurrentUser((pre) => ({ ...pre, data }))
  }

  const currentUserFunction = (data) => {
    setCurrentUser(data)
    setShowScreen(true)

  }
  const backToScreen = () => {
    setCurrentUser({})
    setShowScreen(false)
  }


  const logoutFunction = () => {
    localStorage.setItem('chatuser', JSON.stringify(''))
    return window.location.href = '/login'
  }

  return (
    <div className='h-screen relative lg:flex w-full overflow-hidden'>
      <div className={`lg:flex-1 ${showScreen ? 'hidden lg:block' : "block"}`}>
        <div className=' sticky top-0 w-full z-50 bg-white'> 
          <h1 className='text-2xl font-bold text-green-900 text-center p-10'>Chap app</h1>
          <div className='mb-3 mx-10 flex justify-between'>
            <h6 className='text-lg md:text-xl font-semibold text-gray-700 '>All User</h6>
            <button className='text-gray-700 hover:underline cursor-pointer text-base md:text-lg  ' onClick={logoutFunction}>Logout</button>
          </div>

        </div>
        <div className='bg-gray-200 overflow-y-scroll w-full h-[80%] pt-10 pb-20 scrollbar-hide'>
          <div className='mx-3 md:mx-10 flex flex-col gap-5'>
            {
              user[0]?.map((itm, inx) => (

                <>
                  {itm.id === currentUserDetails.id ? "" :
                    <div className={`flex items-center py-2 px-4 w-full h-15 md:h-18  rounded-xl cursor-pointer gap-1 ${itm.id === currentUser.id ? "bg-green-400" : "bg-green-100"}`}
                      key={inx}
                      onClick={() => { currentUserFunction(itm) }}>
                      <img src='' className=' w-10 h-10 md:w-12 md:h-12 bg-gray-900 rounded-full mr-3' alt='User Image' />
                      <p className={`text-base md:text-lg font-medium  ${itm.id === currentUser.id ? "text-white" : "text-gray-700"}`}>{itm?.name}</p>
                    </div>
                  }
                </>
              ))
            }
          </div>
        </div>
      </div>
      {currentUser.name && <div className={`lg:flex-1 ${!showScreen ? 'hidden lg:block' : "block"}`}>
        <Chatting currentUser={currentUser} backToScreen={backToScreen} />
      </div>}

    </div>
  )
}

export default Home