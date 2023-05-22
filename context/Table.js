import { createContext, useState } from "react";

export const tableContext = createContext({})

export default function TableProvider({ children }) {
    const [ layout, setLayout ] = useState('card')

    return <tableContext.Provider value={{ layout, setLayout }}>{children}</tableContext.Provider>
}