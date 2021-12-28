import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingIndicator, NavAuth } from "../../../components";
import { StyledAuthPage } from "../../../components/Auth/AuthPageStyles";
import { ActivateAccountDetail } from "../../../interfaces";
import { activateAccount } from "../../../utilities/Auth";

const Activate: NextPage = () => {
    const router = useRouter();
    const [details, setDetails] = useState<ActivateAccountDetail>({
        token: "",
        uid: "",
    });
    const [activating, setActivating] = useState(true);
    const [activateError, setActivateError] = useState(null);

    const handleActivateAccount = async () => {
        try {
            await activateAccount(details);
            // .....
            // redirect to homepage on success
            // update user info in local storage
        } catch (error) {
            setActivating(false);
            // display error
            // redirect to verification page(if neccessary)
        }
    };

    const handleResendVerifyLink = async () => {
        try {
        } catch (error) {}
    };

    useEffect(() => {
        const { query } = router;
        if (!query) return;

        const { uid, token } = query as unknown as ActivateAccountDetail;
        setDetails({ uid, token });
    }, [router]);

    useEffect(() => {
        handleActivateAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    return (
        <>
            <NavAuth />
            <StyledAuthPage>
                {activating && <LoadingIndicator className="loading-big" />}
                {activateError && (
                    <button type="button" onClick={handleResendVerifyLink}>
                        Resend verification link
                    </button>
                )}
            </StyledAuthPage>
        </>
    );
};

export default Activate;
