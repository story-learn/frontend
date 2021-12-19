import axios from "axios";
import { BASE_URLS } from "../Constants";
import { AuthTokens } from "../interfaces";

let localAuth = localStorage.getItem("authTokens");

let authTokens: AuthTokens | null = localAuth ? JSON.parse(localAuth) : null;

const storyInstance = axios.create({
    baseURL: BASE_URLS.Story,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
});

storyInstance.interceptors.request.use(async (req) => {
    if (!authTokens) {
        //
    }
});

export { storyInstance };
