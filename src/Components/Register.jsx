import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosURL from '../api/AxiosURL'

const Register = () => {
    const navigate = useNavigate()

    const initional = {
        name: '',
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
        e.preventDefault()
        const { name, email, password } = user
        const errorMessage = {}
        if (name === '') errorMessage.name = "Please Enter Name"
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
            const res = await axiosURL.post('/api/register', user)
            alert(res.data.message)
            setUser(initional)
            navigate('/login')
        } catch (error) {
            if (error.response?.status === 400) alert(error.response.data.message)
            else if (error.response?.status === 409) alert(error.response.data.message)
            else console.log("Internal server error", error);
        }
    }

    return (
        <div className='h-screen relative flex justify-center items-center bg-green-400 '>
            <div className='flex flex-col mx-auto w-75 p-10 bg-gray-300 shadow-md rounded-md'>
                <h1 className='text-2xl font-bold text-green-900 mb-10 text-center'>Chat app Register</h1>
                <form onSubmit={userSubmitFunction} className='flex flex-col gap-6'>
                    <div className='relative '>
                        <input type="text"
                            className='p-2 border outline-none font-medium text-green-700 rounded-md w-full'
                            value={user.name}
                            name='name'
                            placeholder='Enter your name'
                            onChange={userInputFunction}
                        />
                        {error.name && <span className='absolute left-0 -bottom-4 text-xs text-red-600  '>{error.name}</span>}
                    </div>
                    <div className='relative '>
                        <input type="email"
                            className='p-2 border outline-none font-medium text-green-700 rounded-md w-full'
                            name='email'
                            value={user.email}
                            placeholder='Enter your email'
                            onChange={userInputFunction}
                        />
                        {error.email && <span className='absolute left-0 -bottom-4 text-xs text-red-600  '>{error.email}</span>}
                    </div>
                    <div className='relative '>
                        <input
                            className='p-2 border outline-none font-medium text-green-700 rounded-md w-full'
                            type="password"
                            name='password'
                            value={user.password}
                            placeholder='Enter your password'
                            onChange={userInputFunction}
                        />
                        {error.password && <span className='absolute left-0 -bottom-4 text-xs text-red-600  '>{error.password}</span>}
                    </div>
                    <button type='submit' className=' w-fit mx-auto py-2 px-5 border outline-none font-medium text-green-700 rounded-md hover:text-white hover:bg-green-700 hover:border-green-700 cursor-pointer'>Register</button>
                </form>
                <div className=' flex flex-col items-center mt-7'>
                    <p className='text-center '>if you already register, back to </p>
                    <Link className='text-sm text-red-600 hover:underline cursor-pointer ' to={'/login'}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register