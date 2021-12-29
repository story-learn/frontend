import jwtDecode from "jwt-decode";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingIndicator, NavAuth } from "../../../components";
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
    const [activateError, setActivateError] = useState(null);

    const handleActivateAccount = async () => {
        try {
            await activateAccount(details);

            router.replace("/signin");
        } catch (error) {
            console.error("error");
            setActivating(false);
            // display error
            // redirect to verification page(if neccessary)
        }
    };

    const handleResendVerifyLink = async () => {
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
