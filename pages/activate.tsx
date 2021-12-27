import { NextPage } from "next";
import { useEffect, useState } from "react";
import { LoadingIndicator, NavAuth } from "../components";
import { StyledAuthPage } from "../components/Auth/AuthPageStyles";

const Activating: NextPage = () => {
    const [activaing, setActivaing] = useState(true);
    const [activateError, setActivateError] = useState(null);

    const activateAccount = async () => {
        try {
            // send request to backend
            // ....
            // ....
            // ....
            // redirect to homepage on success
            // update user info in local storage
        } catch (error) {
            setActivaing(false);
            // display error
            // redirect to verification page(if neccessary)
        }
    };

    const handleResend = async () => {
        try {
        } catch (error) {}
    };

    useEffect(() => {
        activateAccount();
    }, []);

    return (
        <>
            <NavAuth />
            <StyledAuthPage>
                {activaing && <LoadingIndicator className="loading-big" />}
                {activateError && (
                    <button type="button" onClick={handleResend}>
                        Resend verification link
                    </button>
                )}
            </StyledAuthPage>
        </>
    );
};

export default Activating;
