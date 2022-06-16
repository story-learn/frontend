import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
// import { useAuth } from "../context/AuthContext";

type withAuthenticatedUser = (Component: FC) => FC;

const ProtecteRoute: withAuthenticatedUser = (Component) => {
    const Authenticated: FC = (): JSX.Element | null => {
        const { authenticating, user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (authenticating) return;

            if (!user) router.replace("/signin");
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [authenticating, user]);

        if (authenticating) return <div>Authenticating.....</div>;

        return user ? <Component /> : null;
    };

    return Authenticated;
};

export default ProtecteRoute;
