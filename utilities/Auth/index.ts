import axios, { AxiosError, AxiosResponse } from "axios";
import { STORY } from "../../configs/story";
import {
    ActivateAccountDetail,
    Authentication,
    AuthenticationError,
    AuthTokens,
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

export const usernameExists = async (username: string) => {
    try {
        let response = await STORY.post(`/auth/checkifexists/user/`, {
            username,
        });

        let { message } = response.data;

        message = message.trim();

        return message;
    } catch (error) {
        throw error;
    }
};

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

export const resendVerification = async (email: string) => {
    try {
        await STORY.post(`/auth/users/resend_activation/`, { email });
    } catch (error) {
        console.log(error);
    }
};

export const logIn = async (detail: Auth) => {
    let data = {
        username: detail.userName,
        password: detail.password,
        // username: "Acel",
        // password: "0000",
    };

    try {
        let result = await STORY.post<AuthTokens>(
            `/auth/jwt/custom-create/`,
            data
        );
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

        let auth = await STORY.post<any, AxiosError>(`/auth/users/`, data);

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

export const activateAccount = async (detail: ActivateAccountDetail) => {
    try {
        let activated = await STORY.post<AuthTokens>(
            `/auth/users/activation`,
            detail
        );
        return activated.data;
    } catch (error) {
        // throw error;
    }
};
