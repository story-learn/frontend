import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Layout } from ".";
import { useAuth } from "../context/AuthContext";

type withAuthenticatedUser = (Component: FC) => FC;

const ProtecteRoute: withAuthenticatedUser = (Component) => {
    const Authenticated: FC = (): JSX.Element | null => {
        //
        const { authenticating, isUserAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (authenticating) return;

            if (!isUserAuthenticated) router.replace("/signin");
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [authenticating, isUserAuthenticated]);

        if (authenticating) return <div>Authenticating.....</div>;

        return isUserAuthenticated ? (
            <Layout>
                <Component />
            </Layout>
        ) : null;
    };

    return Authenticated;
};

export default ProtecteRoute;
