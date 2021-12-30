import { NextPage } from "next";
import { useRouter } from "next/router";
import { NavAuth, Notification } from "../components";
import { StyledVerifyPage } from "../components/Auth/StyledVerifyPage";
import { resendVerification } from "../utilities/Auth";
import { toast } from "react-hot-toast";
import { VerifyEmailIcon } from "../components/SVGs";

const Verify: NextPage = () => {
    let router = useRouter();

    const handleResend = async () => {
        let email = router.query.email as string;

        try {
            await resendVerification(email);
            toast.custom(
                <Notification
                    type="success"
                    shortText="Another verification link has been sent to your account"
                />
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <NavAuth />
            <StyledVerifyPage>
                <header className="verify__header">
                    <figure className="verify__header-fig">
                        {/*  */}
                        <VerifyEmailIcon />
                    </figure>
                </header>
                <p className="verify__para">
                    One more thing!
                    <br />
                    We have sent an email. Kindly click on the link in the email
                    to verify your account.
                </p>
                <p className="verify__email">
                    Didn’t get the email?{" "}
                    <button type="button" onClick={handleResend}>
                        Resend verification link
                    </button>
                </p>
            </StyledVerifyPage>
        </>
    );
};

export default Verify;
