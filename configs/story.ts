import axios from "axios";
import { BASE_URLS } from "../Constants";

export const STORY = axios.create({
    baseURL: BASE_URLS.Story,
});

export const StoryRoutes = {
    SIGNIN: "/auth/jwt/custom-create/",
    SIGNUP: "/auth/users/",
    RESEND_VERIFICATION_LINK: "/auth/users/resend_activation/",
    CREATE_STORY: "/story/story/",
};
