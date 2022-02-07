import Link from "next/link";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Button,
    InputPassword,
    NavAuth,
    Notification,
} from "../../../components";
import { StyledAuthPage } from "../../../components/Auth/AuthPageStyles";
import { StyledForm } from "../../../components/Form/FormStyles";
import { useAuth } from "../../../context/AuthContext";
import { ResetPassword as IResetPassword } from "../../../interfaces";
import { resetPassword } from "../../../utilities/Auth";

const ResetPassword = () => {
    const { query, prefetch, replace } = useRouter();
    const { setAuthTokens, setUser } = useAuth();

    const [password, setPassword] = useState("");
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);

    const reset: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!query) return;

        let { token, uid } = query as Omit<IResetPassword, "password">;

        let data: IResetPassword = { new_password: password, token, uid };

        try {
            setError(null);
            setLoading(true);
            setDisableBtn(true);

            await resetPassword(data);

            localStorage.removeItem("authTokens");
            setAuthTokens(null);
            setUser(null);

            toast.custom(
                <Notification
                    type="success"
                    shortText="Password Successfully updated!!"
                />
            );

            // redirect to login page
            replace("/signin");
        } catch (error) {
            let { message } = error as Error;
            setError(message);
        } finally {
            setLoading(false);
            setDisableBtn(false);
        }
    };

    useEffect(() => {
        setDisableBtn(password.length < 8);
    }, [password]);

    useEffect(() => {
        // user will be redirected to homepage upon succes
        prefetch("/signin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <NavAuth />
            <StyledAuthPage>
                <header>
                    <h1>Reset Password Page</h1>
                    <p>Kindly enter a new password.</p>
                </header>
                <StyledForm onSubmit={reset}>
                    <InputPassword
                        id="password"
                        label="Password"
                        name="password"
                        value={password}
                        placeholder="minimum of 8 characters"
                        handleChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="form__control-submit">
                        <Button
                            type="submit"
                            text="Reset Password"
                            disabled={disableBtn}
                            processing={loading}
                        />
                    </div>
                </StyledForm>
                <p className="activation__error-para">{error}</p>
                {error?.toLowerCase().startsWith("invalid token") && (
                    <p className="other other-signin">
                        Go to{" "}
                        <Link href={"/forgotpassword"}>
                            <a>forgot password</a>
                        </Link>{" "}
                        page to request for new token
                    </p>
                )}
            </StyledAuthPage>
        </>
    );
};

export default ResetPassword;
