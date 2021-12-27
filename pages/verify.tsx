import { NextPage } from "next";
import { useRouter } from "next/router";
import { NavAuth } from "../components";
import { StyledVerifyPage } from "../components/Auth/StyledVerifyPage";
import { resendVerification } from "../utilities/Auth";
import { toast } from "react-hot-toast";
import { VerifyEmailIcon } from "../components/SVGs";

const verify: NextPage = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let router = useRouter();

    const handleResend = async () => {
        let email = router.query.email as string;

        try {
            await resendVerification(email);
            toast.success(
                "another verification link has been sent to your account"
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

export default verify;
