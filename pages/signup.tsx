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
    LoadingIndicator,
    NavAuth,
} from "../components";
import { StyledAuthPage } from "../components/Auth/AuthPageStyles";
import { StyledForm } from "../components/Form/FormStyles";
import { Authentication, AuthenticationError } from "../interfaces";
import { validateSignUpInfo } from "../utilities/validateSignUpInfo";
import {
    emailExists,
    ReturningError,
    signup,
    usernameExists,
} from "../utilities/Auth";
import router from "next/router";
import { useAuth } from "../context/AuthContext";
import { HeadTag } from "../components/head";
import { PersonIcon, MessageIcon } from "./../components/SVGs";
import { toast } from "react-hot-toast";

const Signup: NextPage = () => {
    let { user } = useAuth();
    const [authenticating, setAuthenticating] = useState(false);
    const [disableSignUpBtn, setDisableSignUpBtn] = useState(true);
    const [checkingUserName, setCheckingUserName] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);

    const [userDetail, setUserDetail] = useState<Authentication>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userName: "",
    });

    const [inputErrors, setInputErrors] = useState<AuthenticationError>({
        firstName: { msg: "", status: null },
        lastName: { msg: "", status: null },
        email: { msg: "", status: null },
        password: { msg: "", status: null },
        userName: { msg: "", status: null },
    });

    // use this to determine if user has touched(focused) input field, at least once
    // this also determines wheter to show error field or not
    const [inputTouched, setInputTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        userName: false,
    });

    // change input focused state
    const handleUserHasFocused = (name: keyof Authentication) => {
        setInputTouched((prev) => ({ ...prev, [name]: true }));
    };

    const fieldError = (field: keyof AuthenticationError): string => {
        const shouldShow = inputTouched[field];

        // if input has not been focused at all
        if (!shouldShow) {
            return "";
        }

        const hasError = inputErrors[field].status;

        return hasError ? "invalid" : "valid";
    };

    const handleFormDetail: ChangeEventHandler<HTMLInputElement> = async (
        e
    ) => {
        let { name, value } = e.target;
        setUserDetail((prev) => ({ ...prev, [name]: value }));

        // update error
        let newErrors = await validateSignUpInfo(
            name as keyof Authentication,
            value,
            inputErrors
        );

        setInputErrors({ ...newErrors });
    };

    // validate user input on blur
    // this specifically applies to when user leave an input field without changing its value
    const handleOnBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
        let { name, value } = e.target;

        let newErrors = await validateSignUpInfo(
            name as keyof Authentication,
            value,
            inputErrors
        );

        setInputErrors({ ...newErrors });
    };

    // check if username has been taken
    // this determines the final error status of username field
    const handleUserNameBlur = async (username: string) => {
        console.log("got here....");
        let { msg: userNameErrorMsg, status: userNameErrorStatus } =
            inputErrors.userName;

        // do not bother to send a request if there is an error already OR
        // if status is still null. This happens because when the user hasn't interacted with the input and he leaves(triggers onBlur event)
        if (userNameErrorMsg || userNameErrorStatus === null) {
            return;
        }

        try {
            setCheckingUserName(true);

            let userNameTaken = await usernameExists(userDetail.userName);
            let userName: AuthenticationError["userName"];

            if (userNameTaken) {
                userName = {
                    msg: `${username} is not available`,
                    status: true,
                };
            } else {
                userName = { msg: ``, status: false };
            }

            setInputErrors((prev) => ({ ...prev, userName }));
        } catch (error) {
            console.log(error);
        } finally {
            setCheckingUserName(false);
        }
    };

    // check if email has been taken
    // this determines the final error status of email field
    const handleEmailOnBlur = async (Email: string) => {
        let { msg: emailErrorMsg, status: emailErrorStatus } =
            inputErrors.email;

        // do not bother to send a request if there is an error already
        if (emailErrorMsg || emailErrorStatus === null) {
            return;
        }

        try {
            setCheckingEmail(true);

            let emailTaken = await emailExists(userDetail.email);
            let email: AuthenticationError["email"];

            if (emailTaken) {
                email = {
                    msg: `${Email} is not available`,
                    status: true,
                };
            } else {
                email = { msg: ``, status: false };
            }

            setInputErrors((prev) => ({ ...prev, email }));
        } catch (error) {
            console.log(error);
        } finally {
            setCheckingEmail(false);
        }
    };

    const handleSubmitForm: FormEventHandler = async (e) => {
        e.preventDefault();

        if (user) {
            toast.error(
                "You are currently signed in! Kindly log out to sign in another account."
            );
            return;
        }

        try {
            setAuthenticating(true);
            setDisableSignUpBtn(true);

            let auth = await signup(userDetail);
            router.replace(`/verify?email=${userDetail.email}`);
        } catch (error) {
            setInputErrors((prev) => ({
                ...prev,
                ...(error as ReturningError),
            }));
            setDisableSignUpBtn(true);
        } finally {
            setAuthenticating(false);
        }
    };

    useEffect(() => {
        let disable = Object.keys(inputErrors).some(
            (field) =>
                inputErrors[field as keyof Authentication].status !== false
        );
        setDisableSignUpBtn(disable);
    }, [inputErrors]);

    return (
        <>
            <HeadTag title="Storylearn - Sign up" />

            <NavAuth />
            <StyledAuthPage>
                <header>
                    <h1>Create An Account</h1>
                </header>
                <StyledForm onSubmit={handleSubmitForm} autoComplete="off">
                    <div className="form__control-grid">
                        <Input
                            value={userDetail.firstName}
                            name="firstName"
                            id="firstName"
                            label="First Name"
                            placeholder="First name"
                            handleChange={handleFormDetail}
                            error={inputErrors.firstName.msg}
                            showError={fieldError("firstName")}
                            handleBlur={(e) => {
                                handleUserHasFocused("firstName");
                                handleOnBlur(e);
                            }}
                            Icon={
                                <figure className="form__input-icon">
                                    <PersonIcon />
                                </figure>
                            }
                        />
                        <Input
                            value={userDetail.lastName}
                            name="lastName"
                            id="lastName"
                            label="Last Name"
                            placeholder="Last name"
                            handleChange={handleFormDetail}
                            showError={fieldError("lastName")}
                            handleBlur={(e) => {
                                handleUserHasFocused("lastName");
                                handleOnBlur(e);
                            }}
                            error={inputErrors.lastName.msg}
                            Icon={
                                <figure className="form__input-icon">
                                    <PersonIcon />
                                </figure>
                            }
                        />
                    </div>

                    <Input
                        type="email"
                        value={userDetail.email}
                        name="email"
                        id="email"
                        label="Email"
                        placeholder="Email"
                        showError={fieldError("email")}
                        handleBlur={(e) => {
                            handleUserHasFocused("email");
                            handleOnBlur(e);
                            handleEmailOnBlur(e.target.value);
                        }}
                        handleChange={handleFormDetail}
                        error={inputErrors.email.msg}
                        Icon={
                            <figure className="form__input-icon">
                                {checkingEmail ? (
                                    <LoadingIndicator className="form__input-processing" />
                                ) : (
                                    <MessageIcon />
                                )}
                            </figure>
                        }
                    />

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
                            handleUserNameBlur(e.target.value);
                        }}
                        handleChange={handleFormDetail}
                        error={inputErrors.userName.msg}
                        Icon={
                            <figure className="form__input-icon">
                                {checkingUserName ? (
                                    <LoadingIndicator className="form__input-processing" />
                                ) : (
                                    <PersonIcon />
                                )}
                            </figure>
                        }
                        processing={checkingUserName}
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
                            text="Sign Up"
                            disabled={disableSignUpBtn}
                            processing={authenticating}
                        />
                    </div>
                </StyledForm>
                <p className="other">
                    By signing up, you agree to our{" "}
                    <Link href="/">
                        <a>terms and conditions</a>
                    </Link>
                </p>
                <p className="other other-signin">
                    Have An Account?<Link href="/signin"> Login</Link>
                </p>
            </StyledAuthPage>
        </>
    );
};

export default Signup;
