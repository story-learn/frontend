import axios from "axios";
import jwtDecode from "jwt-decode";
import { BASE_URLS } from "../Constants";
import { useAuth } from "../context/AuthContext";
import { AuthTokens, AuthUserToken } from "../interfaces";

// this should only be used in a protected route because tokens are needed
const useStoryRequest = () => {
    let baseURL = BASE_URLS.Story;
    const { authTokens, setAuthTokens, setUser } = useAuth();

    const storyInsatnce = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${authTokens?.access}` },
    });

    storyInsatnce.interceptors.request.use(async (req) => {
        let availableToken = authTokens!;

        const userToken: AuthUserToken = jwtDecode(availableToken.access);

        const tokenExpired = Date.now() > userToken.exp;

        if (!tokenExpired) return req;

        const { data } = await axios.post<AuthTokens>(
            `${baseURL}/auth/jwt/refresh`,
            {
                refresh: availableToken.refresh,
            }
        );

        localStorage.setItem("authTokens", JSON.stringify(data));

        setAuthTokens(data);
        setUser(jwtDecode(data.access));

        // fix this!!!
        req!.headers!.Authorization = `Bearer ${data.access}`;
        return req;
    });

    return { storyInsatnce };
};

export default useStoryRequest;
