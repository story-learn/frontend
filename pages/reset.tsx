import { FormEventHandler, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Button, Input } from "../components";
import { StyledAuthPage } from "../components/Auth/AuthPageStyles";
import { StyledForm } from "../components/Form/FormStyles";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [reseting, setReseting] = useState(false);

    const [disableResetBtn, setDisableResetBtn] = useState(false);

    const submit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            setReseting(true);
            setDisableResetBtn(true);
        } catch (error) {
            console.log(error);
        } finally {
            // setReseting(false);
            // setDisableResetBtn(false);
        }
    };

    console.log(!email && disableResetBtn);
    return (
        <>
            <StyledAuthPage>
                <header>
                    <h1>Reset Password Page</h1>
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
                                <HiOutlineMail />
                            </figure>
                        }
                        error={error}
                    />
                    <div className="form__control-submit">
                        <Button
                            type="submit"
                            text="Reset Password"
                            disabled={disableResetBtn}
                            processing={reseting}
                        />
                    </div>
                </StyledForm>
            </StyledAuthPage>
        </>
    );
};

export default Reset;
