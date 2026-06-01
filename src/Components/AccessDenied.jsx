import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextData } from '../context/ProviedData'
import { useEffect } from 'react'

const AccessDenied = () => {
    const navigate = useNavigate()
    const {currentUserDetails} = useContext(ContextData)
    useEffect(() => {
        if (!currentUserDetails.token) {
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        }else{
            navigate('/user/')
        }
    }, [])

    return (
        <div>
            <p>Access denied...😬</p>
        </div>
    )
}

export default AccessDenied