import { useRouter } from "next/router";
import { createContext, useEffect } from "react";

export const sessionContext = createContext({})

export default function SessionProvider({ children }) {
    const setUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData))
    }
    const getUser = () => {
        let user = localStorage.getItem('user')
        return user
    }
    const deleteUser = () => {
        console.log('entrou em')
        localStorage.removeItem('user')
        return
    }
    return <sessionContext.Provider value={{ setUser, getUser, deleteUser }}>{children}</sessionContext.Provider>
}