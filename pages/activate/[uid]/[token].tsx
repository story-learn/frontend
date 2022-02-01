import jwtDecode from "jwt-decode";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, LoadingIndicator, NavAuth } from "../../../components";
import { StyledAuthPage } from "../../../components/Auth/AuthPageStyles";
import { useAuth } from "../../../context/AuthContext";
import { ActivateAccountDetail } from "../../../interfaces";
import { activateAccount } from "../../../utilities/Auth";

const Activate: NextPage = () => {
    const router = useRouter();
    let { setAuthTokens, setUser } = useAuth();

    const [details, setDetails] = useState<ActivateAccountDetail>({
        token: "",
        uid: "",
    });
    const [activating, setActivating] = useState(true);
    const [activateError, setActivateError] = useState<null | string>(null);

    const handleActivateAccount = async () => {
        try {
            await activateAccount(details);

            router.replace("/signin");
        } catch (error) {
            let err = error as Error;
            setActivating(false);

            setActivateError(err.message);
            // display error
            // redirect to verification page(if neccessary)
        }
    };

    const handleResendVerifyLink = async () => {
        alert("clicked....");
        try {
        } catch (error) {}
    };

    // prefetch signin page since user will be redirected to login page on successful activation
    useEffect(() => {
        router.prefetch("/signin");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { query } = router;
        if (!query) return;

        const { uid, token } = query as unknown as ActivateAccountDetail;
        setDetails({ uid, token });
    }, [router]);

    useEffect(() => {
        let { token, uid } = details;
        if (!token || !uid) return;

        handleActivateAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    return (
        <>
            <NavAuth />
            <StyledAuthPage className="activation">
                {activating && <LoadingIndicator className="loading-big" />}
                {activateError && (
                    <>
                        <p className="activation__error-para">
                            {activateError}
                        </p>
                        <Button
                            className="activation__error-btn"
                            onClick={handleResendVerifyLink}
                            type="button"
                            text="Resend verification link"
                            variant="no-border"
                        />
                    </>
                )}
            </StyledAuthPage>
        </>
    );
};

export default Activate;
