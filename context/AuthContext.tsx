import jwtDecode from "jwt-decode";
import { createContext, Dispatch, FC, useEffect, useState } from "react";
import { AuthTokens, AuthUser } from "../interfaces";

interface IAuth {
    authenticating: boolean;
    user: null | AuthUser;
    authTokens: AuthTokens | null;
    setUser: Dispatch<any>;
    setAuthTokens: Dispatch<any>;
    handleAuthenticating: (val: boolean) => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider: FC = ({ children }) => {
    const [authenticating, setAuthenticating] = useState(true);
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState<IAuth["authTokens"]>(null);

    const handleAuthenticating = (val: boolean) => {
        setAuthenticating(val);
    };

    useEffect(() => {
        let localAuthTokens = localStorage.getItem("authTokens");

        if (localAuthTokens) {
            let authToken: AuthTokens = JSON.parse(localAuthTokens);
            setAuthTokens(authToken);
            setUser(jwtDecode(authToken.access));
        } else {
            setAuthTokens(null);
            setUser(null);
        }

        setAuthenticating(false);
    }, []);

    const logout = () => {
        localStorage.removeItem("authTokens");
        setAuthTokens(null);
        setUser(null);
    };

    console.log("authenticating", authenticating);

    if (authenticating) return null; // decide authentication right away

    // console.log("user", user);
    return (
        <AuthContext.Provider
            value={{
                authenticating,
                handleAuthenticating,
                user,
                authTokens,
                setUser,
                setAuthTokens,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
