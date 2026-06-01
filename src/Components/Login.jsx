import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosURL from '../api/AxiosURL'
import { useEffect } from 'react'
import { useContext } from 'react'
import { ContextData } from '../context/ProviedData'

const Login = () => {
    const { currentUserDetails } = useContext(ContextData);
    const navigate = useNavigate()
    useEffect(() => {
        if (currentUserDetails) {
            navigate('/user/')
        }
    }, [])

    const initional = {
        email: '',
        password: ''
    }
    const [user, setUser] = useState(initional)
    const [error, setError] = useState(initional)

    const userInputFunction = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        setError({ ...error, [name]: '' })
    }

    const userSubmitFunction = async (e) => {
        e.preventDefault();
        const { email, password } = user
        const errorMessage = {}
        if (email === '') errorMessage.email = "Please Enter Email"
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(email)) errorMessage.email = "Email Not Vaild Format"
        if (!/(?=.*[a-z])/.test(password)) errorMessage.password = "Must have one small letter"
        if (!/(?=.*[A-Z])/.test(password)) errorMessage.password = "Must have one capital letter"
        if (!/(?=.*[@#$%&!*])/.test(password)) errorMessage.password = "Must have one special character"
        if (!/(?=.*\d)/.test(password)) errorMessage.password = "Must have one number"
        if (password.length < 8) errorMessage.password = "Must have 8 character"
        if (password === '') errorMessage.password = "Please Enter Password"
        if (Object.keys(errorMessage).length > 0) {
            setError(errorMessage);
            return;
        }
        try {
            const res = await axiosURL.post('/api/login', user)
            alert(res.data.message)
            setUser(initional)
            localStorage.setItem('chatuser', JSON.stringify(res.data.result))
            navigate('/user/')
        } catch (error) {
            if (error.response?.status === 400) alert(error.response.data.message)
            else console.log("Internal server error", error);
        }
    }

    return (
        <div className='h-screen relative bg-green-400 flex justify-center items-center '>
            <div className='flex flex-col mx-auto w-75 p-10 bg-gray-300 shadow-md rounded-md'>
                <h1 className='text-2xl font-bold text-green-900 mb-10 text-center'>Chat app Login</h1>
                <form className='flex flex-col gap-6' onSubmit={userSubmitFunction}>
                    <div className='relative '>
                        <input type="email"
                            className='p-2 border outline-none font-medium text-green-700 rounded-md w-full'
                            name='email'
                            value={user.email}
                            placeholder='Enter your email'
                            onChange={userInputFunction}
                        /> <br />
                        {error.email && <span className='absolute left-0 -bottom-4 text-xs text-red-600  '>{error.email}</span>}
                    </div>

                    <div className='relative'>
                        <input type="password"
                            className='p-2 border outline-none font-medium text-green-700 rounded-md w-full'
                            name='password'
                            value={user.password}
                            placeholder='Enter your password'
                            onChange={userInputFunction}
                        /> <br />
                        {error.password && <span className='absolute left-0 -bottom-4 text-xs text-red-600  '>{error.password}</span>}
                    </div>
                    <button type='submit' className=' w-fit mx-auto py-2 px-5 border outline-none font-medium text-green-700 rounded-md hover:text-white hover:bg-green-700 hover:border-green-700 cursor-pointer'>Login</button>
                </form>
                <div className='flex gap-2 items-center mt-7'>
                    <p className='text-center '>if you can't register </p>
                    <Link className='text-sm text-red-600 hover:underline cursor-pointer ' to={'/register'}>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login