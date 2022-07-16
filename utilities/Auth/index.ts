import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { STORY, StoryRoutes } from "../../configs/story";
import {
    ActivateAccountDetail,
    Authentication,
    AuthenticationError,
    AuthTokens,
    ResetPassword,
} from "../../interfaces";
import { Auth } from "../../interfaces/types";

interface ResData {
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    id: number;
}

interface ResError {
    [key: string]: string[];
}

export interface ReturningError {
    [key: string]: { msg: string; status: boolean };
}

interface LoginError {
    detail: string;
}

/**
 * checks if a username already exists
 * @param username value to check
 * @returns {string} This username already exists OR This username does not exist
 */

export const usernameExists = async (username: string) => {
    try {
        let response = await STORY.post(`/auth/checkifexists/username/`, {
            username,
        });

        let { message } = response.data;

        message = message.trim();

        // {{This user account is not activated}} message should only be visible in the login page
        if (message === "This user account is not activated") {
            message = "This username already exists";
        }

        return message;
    } catch (error) {
        throw error;
    }
};

/**
 * checks if an email exists
 * @param email value to check
 * @returns {boolean} true/false
 */

export const emailExists = async (email: string) => {
    try {
        let response = await STORY.post(`/auth/checkifexists/email/`, {
            email,
        });

        let { message } = response.data;

        return message === "This email already exists";
    } catch (error) {
        throw error;
    }
};

/**
 * resend a new verification link to the associated email
 * @param email email to resend verification link to
 */

export const resendVerification = async (email: string) => {
    try {
        await STORY.post(StoryRoutes.RESEND_VERIFICATION_LINK, { email });
    } catch (error) {
        console.log(error);
    }
};

/**
 * logs out a user
 * @param refresh token to log out
//  * @returns detail of newly created user if successful
//  * @throws log in error
 */

export const signout = async (
    storyInstance: AxiosInstance,
    refresh: string
) => {
    try {
        let route = StoryRoutes.LOGOUT;
        await storyInstance.post(route, { refresh });
    } catch (error) {
        throw error;
    }
};

/**
 * logs in a user
 * @param detail
 * @returns detail of newly created user if successful
 * @throws log in error
 */

export const logIn = async (detail: Auth) => {
    let data = {
        username: detail.userName,
        password: detail.password,
        // username: "Acel",
        // password: "0000",
    };

    try {
        let result = await STORY.post<AuthTokens>(StoryRoutes.SIGNIN, data);
        return result.data;
    } catch (error) {
        let resError = "";

        if (axios.isAxiosError(error)) {
            if (error.response) {
                let { status, statusText } = error.response;

                if (status === 401 || statusText === "Unauthorized") {
                    resError = error.response.data.detail;
                }
            }
        } else {
            resError = "Unknown error! Please try again later";
        }
        throw resError;
    }
};

/**
 * sign up a user and direct them to success(verify) page
 * @param detail user's detail
 * @returns
 */

export const signup = async (detail: Authentication) => {
    try {
        let data = {
            email: detail.email,
            first_name: detail.firstName,
            last_name: detail.lastName,
            username: detail.userName,
            password: detail.password,
            re_password: detail.password,
        };

        let auth = await STORY.post<any, AxiosError>(StoryRoutes.SIGNUP, data);

        return auth;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            let errors = error.response?.data as ResError;
            delete errors["re_password"];

            let returnedErrors: ReturningError = {};

            for (let key in errors) {
                // this is to correct the key coming from backend
                if (key === "first_name") {
                    returnedErrors["firstName"] = {
                        msg: errors[key][0],
                        status: true,
                    };
                } else if (key === "last_name") {
                    returnedErrors["lastName"] = {
                        msg: errors[key][0],
                        status: true,
                    };
                } else {
                    returnedErrors[key] = { msg: errors[key][0], status: true };
                }
            }

            throw returnedErrors;
        }

        // throw error;
    }
};

/**
 * activate a user's account
 * @param {{uid: string; token: string;}} detail user's activation detail
 */

export const activateAccount = async (detail: ActivateAccountDetail) => {
    try {
        await STORY.post<AuthTokens>(StoryRoutes.ACCOUNT_ACTIVATION, detail);
    } catch (error) {
        let errorMsg = "";

        if (axios.isAxiosError(error)) {
            errorMsg = error.response?.data?.detail;
        } else {
            errorMsg =
                "Please, request for another activation link and try again!";
        }

        throw new Error(errorMsg);
    }
};

/**
 * send a reset password link to the user's email
 * @param email user's email
 * @returns void
 * @throws random error
 */

export const forgotPassword = async (email: string) => {
    try {
        await STORY.post(StoryRoutes.FORGOT_PASSWORD, { email });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
        }
        throw new Error("There is an error! Please Try again later!!");
    }
};

/**
 * reset password to a user account
 * @param {{uid: string; token: string; new_password: string;}} data user's data
 * @returns void
 */

export const resetPassword = async (data: ResetPassword) => {
    try {
        await STORY.post(StoryRoutes.RESET_PASSWORD, data);
    } catch (error) {
        let err = "";
        if (axios.isAxiosError(error)) {
            let errArray = error.response?.data as Object;
            err = (Object.values(errArray)[0] as string[])[0];
        } else {
            err = "Unknown error! Try again later";
        }

        throw new Error(err);
    }
};
