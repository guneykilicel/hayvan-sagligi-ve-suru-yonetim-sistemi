import { create } from "@mui/material/styles/createTransitions";
import React, {createContext, useState} from "react";

export const ThemeContext = createContext<any>({theme: "dark", setTheme: () => {}});

export const ThemeProvider: React.FC<any> = ({children}) => {

    // localStorage.setItem("theme", "dark" light);
    const [theme, setTheme] = useState('light');

    return <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
}