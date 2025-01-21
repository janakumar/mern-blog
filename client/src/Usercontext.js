import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext({});

// Corrected Provider Component
export function UserContextProvider({ children }) {
    const [userinfo, setUserinfo] = useState({});

    return (
        <UserContext.Provider value={{ userinfo, setUserinfo }}>
            {children}
        </UserContext.Provider>
    );
}
