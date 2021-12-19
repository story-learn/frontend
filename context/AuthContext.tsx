import jwtDecode from "jwt-decode";
import {
    createContext,
    Dispatch,
    FC,
    useContext,
    useEffect,
    useState,
} from "react";
import { AuthTokens } from "../interfaces";

interface IAuth {
    authenticating: boolean;
    user: any;
    authTokens: AuthTokens | null;
    setUser: Dispatch<any>;
    setAuthTokens: Dispatch<any>;
    handleAuthenticating: (val: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

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

    console.log("user", user);
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

export const useAuth = () => {
    let context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useauth must be within AuthProvider");
    }

    return context;
};
