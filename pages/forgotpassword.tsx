import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { Button, Input, NavAuth, Notification } from "../components";
import { StyledAuthPage } from "../components/Auth/AuthPageStyles";
import { StyledForm } from "../components/Form/FormStyles";
import { MessageIcon } from "../components/SVGs";
import { forgotPassword } from "../utilities/Auth";
import { toast } from "react-hot-toast";

const ForgotPassword: NextPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [disabaleForgotPasswordBtn, setDisabaleForgotPasswordBtn] =
        useState(true);

    const submit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setDisabaleForgotPasswordBtn(true);

            await forgotPassword(email);
            toast.custom(
                <Notification
                    type="success"
                    shortText="A link to reset your password has been sent to the specified gmail."
                />
            );

            setLoading(false);
            setDisabaleForgotPasswordBtn(false);
            setError(undefined);
            setEmail("");
        } catch (error) {
            let err = error as Error;
            setError(err.message);
            setLoading(false);
            setDisabaleForgotPasswordBtn(false);
            console.log(error);
        } finally {
            // setDisabaleForgotPasswordBtn(false);
        }
    };

    useEffect(() => {
        setDisabaleForgotPasswordBtn(!Boolean(email));
    }, [email]);

    return (
        <>
            <NavAuth />
            <StyledAuthPage>
                <header>
                    <h1>Forgot Password</h1>
                    <p>
                        Kindly enter the email you used to register to reset
                        your password
                    </p>
                </header>
                <StyledForm onSubmit={submit}>
                    <Input
                        type="email"
                        value={email}
                        name="email"
                        id="email"
                        label="Email"
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                        Icon={
                            <figure className="form__input-icon">
                                <MessageIcon />
                            </figure>
                        }
                        error={error}
                    />
                    <div className="form__control-submit">
                        <Button
                            type="submit"
                            text="Send Link"
                            disabled={disabaleForgotPasswordBtn}
                            processing={loading}
                        />
                    </div>
                </StyledForm>
            </StyledAuthPage>
        </>
    );
};

export default ForgotPassword;
