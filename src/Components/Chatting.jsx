import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import axiosURL from '../api/AxiosURL';
import { useContext } from 'react';
import { ContextData } from '../context/ProviedData';

const socket = io(import.meta.env.VITE_API_URL);

const Chatting = ({ currentUser = {}, backToScreen }) => {
    const { currentUserDetails } = useContext(ContextData)

    const getMessageData = async () => {
        try {
            const res = await axiosURL.get('/api/user/getmessage')
            const messageData = res.data.result
            setReceive(messageData)

        } catch (error) {
            console.log("Internal server error", error);
        }
    }
    useEffect(() => {
        getMessageData()
    }, [])

    const { id, email, name } = currentUser
    const navigate = useNavigate()
    const sender = currentUserDetails
    const [receive, setReceive] = useState([])
    const [message, setMessage] = useState('')
    const chatContainerRef = useRef()

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [receive])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setReceive((pre) => [...pre, data])
        });
        return () => {
            socket.off('receive_message')
        }
    }, [])

    const chatMessageFunction = async () => {
        const chatMessage = {
            sender_name: sender.name,
            sender_id: sender.id,
            message: message,
            receiver_id: id,
        }

        socket.emit("send_message", chatMessage)
        setMessage('')
    }

    return (
        <>
            <div className='h-screen relative w-full flex flex-col gap-5 overflow-hidden bg-gray-500'>
                <div className='h-15 bg-green-800  flex items-center gap-3 md:gap-5 px-3 lg:px-10 w-full'>
                    <button className='text-sm text-gray-800 font-bold cursor-pointer' onClick={backToScreen}>Back</button>
                    <div className='flex items-center'>
                        <img src='' className='w-10 h-10 bg-gray-900 rounded-full mr-3' alt='User Image' />
                        <p className='text-base md:text-lg font-medium text-white' > {name}</p>
                    </div>
                </div>
                <div className="h-full w-full relative ">
                    <div ref={chatContainerRef} className='p-4 h-[88%] absolute overflow-y-scroll w-full flex flex-col gap-4 scrollbar-hide leading-10'>
                        {
                            receive.filter((itm) =>
                                (itm.sender_id === sender.id && itm.receiver_id === id) ||
                                (itm.sender_id === id && itm.receiver_id === sender.id)
                            ).map((itm, inx) => (
                                <div key={inx} className={`flex ${itm.sender_id === sender.id ? "justify-end" : "justify-start"}`}>
                                    <div className={`${itm.sender_id === sender.id ? "bg-green-800/70 text-white" : "bg-white text-black"} inline-block w-fit px-3 py-1 rounded-md`}>
                                        <p className='text-base'>{itm.message}</p>
                                        <p className='text-xs text-gray-900'> {itm.sender_name} </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className=' absolute bottom-0 bg-gray-600 h-12 md:h-14 flex items-center w-full px-2 md:px-5 gap-3 md:gap-5'>
                    <input type="text" name="message" id="" placeholder='Send Message....'
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }}
                        className='flex-3 py-2 md:py-3 px-5 bg-gray-500/30 rounded-md text-white outline-none text-base'
                    />
                    <button className='flex-1      py-2 md:py-3 bg-green-500/30 rounded-md text-white outline-none text-base' onClick={chatMessageFunction} type='button'>Send</button>
                </div>
            </div>
        </>
    )
}

export default Chatting