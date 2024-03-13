import { useEffect, useState } from "react";

import { AuthContext } from "../context";

const AuthProvider = ({children}) => {
    // const [auth, setAuth] = useState({});

    const [auth, setAuth] = useState(() => {
        // Load auth information from localStorage on component mount
        const storedAuth = localStorage.getItem("auth");
        return storedAuth ? JSON.parse(storedAuth) : {};
    });

    useEffect(() => {
        // Save auth information to localStorage whenever it changes
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;