import { createContext, FC, useContext, useState } from "react";

interface IAuth {
    authenticating: boolean;
    isUserAuthenticated: boolean;
    user: null;
    handleAuthenticating: (val: boolean) => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider: FC = ({ children }) => {
    const [authenticating, setAuthenticating] = useState(true);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleAuthenticating = (val: boolean) => {
        setAuthenticating(val);
    };

    return (
        <AuthContext.Provider
            value={{
                authenticating,
                handleAuthenticating,
                isUserAuthenticated,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    let context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useauth must be within AuthProvider");
    }

    return context;
};

/*

    const signin = async () => {
        console.log("sign in");
    };

    const signout = async () => {
        console.log("sign out");
    };

    const signup = async () => {
        console.log("sign up");
    };

*/
