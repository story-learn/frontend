import jwtDecode from "jwt-decode";
import { createContext, Dispatch, FC, useEffect, useState } from "react";
import { AuthTokens, AuthUser } from "../interfaces";
import { signout } from "../utilities/Auth";
import { toast } from "react-hot-toast";
import { Notification } from "../components";
import { TOAST_IDS } from "../Constants";
import { AxiosInstance } from "axios";
import { useRouter } from "next/router";

interface IAuth {
    authenticating: boolean;
    user: null | AuthUser;
    authTokens: AuthTokens | null;
    setUser: Dispatch<any>;
    setAuthTokens: Dispatch<any>;
    handleAuthenticating: (val: boolean) => void;
    logout: (storyInstance: AxiosInstance) => void;
}

export const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider: FC = ({ children }) => {
    const { push } = useRouter();
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

    const logout = async (storyInstance: AxiosInstance) => {
        try {
            await signout(storyInstance, authTokens!.refresh);

            localStorage.removeItem("authTokens");
            setAuthTokens(null);
            setUser(null);
            toast.custom(
                <Notification
                    type="success"
                    shortText="Successfully logged out"
                />,
                { id: String(TOAST_IDS.Auth) }
            );
        } catch (error) {
            toast.custom(
                <Notification
                    type="error"
                    shortText="There was an error logging out"
                />,
                { id: String(TOAST_IDS.Auth) }
            );
        }
    };

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
