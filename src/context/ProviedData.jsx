import { createContext } from "react";


export const ContextData = createContext();


const ProviedData = ({ children }) => {

    const userData = localStorage.getItem('chatuser')
    const currentUserDetails = userData ? JSON.parse(userData) : ''

    return (
        <ContextData.Provider value={{ currentUserDetails }}>
            {children}
        </ContextData.Provider>
    )
}

export default ProviedData;