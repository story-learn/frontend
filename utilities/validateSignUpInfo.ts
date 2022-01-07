import { Authentication, AuthenticationError } from "../interfaces";
import { validateUserName } from "./validateUserName";

export const validateSignUpInfo = async (
    name: keyof Authentication,
    value: string,
    errors: AuthenticationError
) => {
    let currentErrors = { ...errors };

    let noError: AuthenticationError["userName"] = { msg: "", status: false };

    switch (name) {
        case "firstName":
        case "lastName":
            if (!value.trim()) {
                currentErrors[name] = {
                    msg: `Name is required!`,
                    status: true,
                };
                // check if name contains number
            } else if (/\d/.test(value)) {
                currentErrors[name] = {
                    msg: `Number is not allowed`,
                    status: true,
                };
            } else if (value.length > 150) {
                currentErrors[name] = {
                    msg: `${
                        name === "firstName" ? "First Name" : "Last Name"
                    } should not be more than 150 characters`,
                    status: true,
                };
            } else {
                currentErrors[name] = noError;
            }
            break;

        case "email":
            if (!value.trim()) {
                currentErrors.email = {
                    msg: "Email is required",
                    status: true,
                };
            } else {
                // currentErrors[name] = noError;
                currentErrors.email = {
                    msg: "",
                    status: true, // checking of email determines the finally error status
                };
            }
            break;

        case "userName":
            let userNameValid = validateUserName(value);

            if (!value.trim()) {
                currentErrors.userName = {
                    msg: "Username is required",
                    status: true,
                };
            } else if (!userNameValid) {
                currentErrors.userName = {
                    msg: "User Name can only contain letters, numbers and @.+-_",
                    status: true,
                };
            } else if (value.length > 150) {
                currentErrors.userName = {
                    msg: "Username should be maximum of 150 characters",
                    status: true,
                };
            } else {
                currentErrors.userName = {
                    msg: "",
                    status: true, // checking of username determines the finally error status
                };
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
