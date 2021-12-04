import { Authentication } from "../interfaces";
import { AuthError } from "../pages/signin";
import { validateUserName } from "./validateUserName";

export const validateSignInInfo = (
    name: keyof Authentication,
    value: string,
    errors: AuthError
) => {
    let currentErrors = { ...errors };

    let noError: AuthError["userName"] = { msg: "", status: false };

    switch (name) {
        case "userName":
            let userNameValid = validateUserName(value);

            if (!value.trim()) {
                currentErrors.userName = {
                    msg: "Username is required",
                    status: true,
                };
            } else {
                currentErrors.userName = noError;
            }

            break;

        case "password":
            if (!value) {
                currentErrors.password = {
                    msg: "Password is required",
                    status: true,
                };
            } else if (value.length < 8) {
                currentErrors.password = {
                    msg: "Password must be miminum of 8 characters",
                    status: true,
                };
            } else {
                currentErrors.password = noError;
            }
            break;
    }

    errors = { ...currentErrors };

    return errors;
};
