import { NextPage } from "next";
import Link from "next/link";
import {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler,
    useEffect,
    useState,
} from "react";
import {
    Button,
    Input,
    InputPassword,
    NavAuth,
    Notification,
} from "../components";
import { StyledAuthPage } from "../components/Auth/AuthPageStyles";
import { StyledForm } from "../components/Form/FormStyles";
import { Authentication, AuthenticationError } from "../interfaces";
import { validateSignInInfo } from "../utilities/validateSignInInfo";
import { logIn } from "../utilities/Auth";
import router from "next/router";
import { useAuth } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { HeadTag } from "../components/head";
import { PersonIcon } from "./../components/SVGs";
import { toast } from "react-hot-toast";

export type Auth = Pick<Authentication, "userName" | "password">;
export type AuthError = Pick<AuthenticationError, "userName" | "password">;

const Signin: NextPage = () => {
    let { setAuthTokens, setUser, user } = useAuth();

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

        if (user) {
            toast.custom(
                <Notification
                    type="error"
                    shortText="You are currently signed in! Kindly log out to sign in another account."
                />
            );
            return;
        }

        try {
            setAuthenticating(true);
            setDisableSignInBtn(true);

            let data = (await logIn(userDetail))!;
            console.log(data);

            localStorage.setItem("authTokens", JSON.stringify(data));
            setAuthTokens(data);
            setUser(jwtDecode(data.access));

            router.replace("/");
        } catch (error) {
            toast.custom(
                <Notification type="error" shortText={error as string} />
            );
        } finally {
            setAuthenticating(false);
            setDisableSignInBtn(false);
        }
    };

    return (
        <>
            <HeadTag title="Storylearn - Sign in" />
            <NavAuth />
            <StyledAuthPage>
                <header>
                    <h1>Log In</h1>
                    {/* <Icc /> */}
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
                                <PersonIcon />
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
