import { NextPage } from "next";
import Link from "next/link";
import {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler,
    useEffect,
    useState,
} from "react";
import { Button, Input, InputPassword } from "../components";
import { StyledAuthPage } from "../components/Auth/AuthPageStyles";
import { StyledForm } from "../components/Form/FormStyles";
import { Authentication, AuthenticationError } from "../interfaces";
import { BsFillPersonFill } from "react-icons/bs";
import { validateSignInInfo } from "../utilities/validateSignInInfo";

export type Auth = Pick<Authentication, "userName" | "password">;
export type AuthError = Pick<AuthenticationError, "userName" | "password">;

const Signin: NextPage = () => {
    const [authenticating, setAuthenticating] = useState(false);
    const [disableSignInBtn, setDisableSignInBtn] = useState(true);

    const [userDetail, setUserDetail] = useState<Auth>({
        password: "",
        userName: "",
    });

    const [inputErrors, setInputErrors] = useState<AuthError>({
        password: { msg: "", status: null },
        userName: { msg: "", status: null },
    });

    const [inputTouched, setInputTouched] = useState({
        password: false,
        userName: false,
    });

    const handleUserHasFocused = (name: keyof Authentication) => {
        setInputTouched((prev) => ({ ...prev, [name]: true }));
    };

    const fieldError = (field: keyof AuthError): string => {
        const shouldShow = inputTouched[field];

        // if input has not been focused at all
        if (!shouldShow) {
            return "";
        }

        const hasError = inputErrors[field].status;

        return hasError ? "invalid" : "valid";
    };

    const handleFormDetail: ChangeEventHandler<HTMLInputElement> = (e) => {
        let { name, value } = e.target;
        setUserDetail((prev) => ({ ...prev, [name]: value }));

        // update error
        let newErrors = validateSignInInfo(
            name as keyof Authentication,
            value,
            inputErrors
        );

        setInputErrors({ ...newErrors });
    };

    const handleOnBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        let { name, value } = e.target;

        let newErrors = validateSignInInfo(
            name as keyof Authentication,
            value,
            inputErrors
        );

        setInputErrors({ ...newErrors });
    };

    useEffect(() => {
        let disable = Object.keys(inputErrors).some(
            (field) => inputErrors[field as keyof Auth].status !== false
        );
        setDisableSignInBtn(disable);
    }, [inputErrors]);

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log("yes");

        try {
            setAuthenticating(true);
            setDisableSignInBtn(true);
        } catch (error) {
            console.log(error);
        } finally {
            setAuthenticating(false);
            setDisableSignInBtn(false);
        }
    };

    return (
        <>
            <StyledAuthPage>
                <header>
                    <h1>Log In</h1>
                </header>
                <StyledForm autoComplete="off" onSubmit={handleSubmitForm}>
                    <Input
                        value={userDetail.userName}
                        name="userName"
                        id="userName"
                        label="User Name"
                        placeholder="User name"
                        showError={fieldError("userName")}
                        handleBlur={(e) => {
                            handleUserHasFocused("userName");
                            handleOnBlur(e);
                        }}
                        handleChange={handleFormDetail}
                        error={inputErrors.userName.msg}
                        Icon={
                            <figure className="form__input-icon">
                                <BsFillPersonFill />
                            </figure>
                        }
                    />
                    <InputPassword
                        value={userDetail.password}
                        name="password"
                        id="password"
                        label="Password"
                        placeholder="Password"
                        handleChange={handleFormDetail}
                        error={inputErrors.password.msg}
                        showError={fieldError("password")}
                        handleBlur={(e) => {
                            handleUserHasFocused("password");
                            handleOnBlur(e);
                        }}
                    />
                    <div className="form__control-submit">
                        <Button
                            type="submit"
                            text="Log In"
                            disabled={disableSignInBtn}
                            processing={authenticating}
                        />
                    </div>
                </StyledForm>
                <p className="other other-forgot">
                    <Link href="/reset">
                        <a>Forgot Password?</a>
                    </Link>
                </p>
            </StyledAuthPage>
        </>
    );
};

export default Signin;
