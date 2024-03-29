import axios from "axios";
import { BASE_URLS } from "../Constants";

export const STORY = axios.create({
    baseURL: BASE_URLS.Story,
});

export const StoryRoutes = {
    // auth
    SIGNIN: "/auth/jwt/custom-create/",
    SIGNUP: "/auth/users/",
    LOGOUT: "/auth/jwt/logout/",
    RESEND_VERIFICATION_LINK: "/auth/users/resend_activation/",
    ACCOUNT_ACTIVATION: "/auth/users/activation/",
    FORGOT_PASSWORD: "/auth/users/reset_password/",
    RESET_PASSWORD: "/auth/users/reset_password_confirm/",

    // story
    CREATE_STORY: "/story/story/",
    GET_STORIES: "/story/storylist",
    GET_STORY: "/story/singlestory",
    LIKE_STORY: "/story/like/",
    // UNLIKE_STORY: "/story/like/",
    BOOKMARK_STORY: "/bookmark/",

    // accounts
    GET_USERS: "/auth/accounts/userlist",

    // profile
    GET_PROFILE: "/auth/users",
    GET_PROFILE_STORIES: "/story/storylist/?category=userid",
    GET_PROFILE_LIKES: "/story/userlikes/",

    // followers/following
    GET_FOLLOWERS: "/userprofile/follower-list",
    GET_FOLLOWING: "/userprofile/following-list",
    FOLLOW_PROFILE: "/userprofile/follow/",
    UNFOLLOW_PROFILE: "/userprofile/unfollow",
};
