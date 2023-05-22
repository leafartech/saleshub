import { createContext, useState } from "react";

export const themeContext = createContext({})

export default function ThemeProvider({ children }) {
    const [ theme, setTheme ] = useState('dark')

    return <themeContext.Provider value={{ theme, setTheme }}>{children}</themeContext.Provider>
}