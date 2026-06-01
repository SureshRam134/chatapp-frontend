import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { ContextData } from "../context/ProviedData"
import AccessDenied from "./AccessDenied"




const User = () => {
    const {currentUserDetails} = useContext(ContextData)
    if(!currentUserDetails.token) {
        return window.location.href = '/login'
    }
    return(
        <div>
            <Outlet/>
        </div>
    )
}

export default User