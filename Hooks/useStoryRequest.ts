import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import { BASE_URLS } from "../Constants";
// import { useAuth } from "../context/AuthContext";
import { AuthTokens, AuthUserToken } from "../interfaces";
import { useAuth } from "./useAuth";
import { STORY } from "./../configs/story";

// this should only be used in a protected route because tokens are needed
const useStoryRequest = () => {
    // let baseURL = BASE_URLS.Story;
    // const { authTokens, setAuthTokens, setUser } = useAuth();

    // const storyInstance = axios.create({
    //     baseURL,
    //     headers: { Authorization: `JWT ${authTokens?.access}` },
    // });

    // storyInstance.interceptors.request.use(async (req) => {
    //     let oldTokens = authTokens!;

    //     const accessToken: AuthUserToken = jwtDecode(oldTokens.access);

    //     const tokenExpired = Date.now() > accessToken.exp * 1000;

    //     if (!tokenExpired) return req;

    //     let { refresh } = oldTokens;

    //     const { data } = await axios.post<{ access: string }>(
    //         `${baseURL}/auth/jwt/refresh`,
    //         { refresh }
    //     );

    //     let newTokens: AuthTokens = { ...data, refresh };

    //     localStorage.setItem("authTokens", JSON.stringify(newTokens));

    //     setAuthTokens(newTokens);
    //     setUser(jwtDecode(newTokens.access));

    //     // fix this!!!
    //     req!.headers!.Authorization = `JWT ${newTokens.access}`;
    //     return req;
    // });

    // return { storyInstance };

    let baseURL = BASE_URLS.Story;
    const { user, authTokens, setAuthTokens, setUser, authenticating } =
        useAuth();

    // let storyInstance: null | AxiosInstance = null;

    // // if (authenticating) return { storyInstance };

    // storyInstance = axios.create({
    //     baseURL,
    // });

    let storyInstance: AxiosInstance = STORY;

    if (!authTokens || !Boolean(user)) return { storyInstance };

    storyInstance = axios.create({
        baseURL,
        headers: { Authorization: `JWT ${authTokens?.access}` },
    });

    storyInstance.interceptors.request.use(async (req) => {
        let oldTokens = authTokens!;

        const accessToken: AuthUserToken = jwtDecode(oldTokens.access);

        const tokenExpired = Date.now() > accessToken.exp * 1000;

        if (!tokenExpired) return req;

        let { refresh } = oldTokens;

        const { data } = await axios.post<{ access: string }>(
            `${baseURL}/auth/jwt/refresh`,
            { refresh }
        );

        let newTokens: AuthTokens = { ...data, refresh };

        localStorage.setItem("authTokens", JSON.stringify(newTokens));

        setAuthTokens(newTokens);
        setUser(jwtDecode(newTokens.access));

        // FIXME!!!
        req!.headers!.Authorization = `JWT ${newTokens.access}`;
        return req;
    });

    return { storyInstance };
};

export default useStoryRequest;
