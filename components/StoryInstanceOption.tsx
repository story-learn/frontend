import { FC, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
// import { useAuth } from "../context/AuthContext";

type withAuthenticatedUser = (Component: FC) => FC;

const StoryInstanceOption: withAuthenticatedUser = (Component) => {
    const Authenticated: FC = (): JSX.Element | null => {
        const { authenticating, user } = useAuth();

        useEffect(() => {
            if (authenticating) return;
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [authenticating, user]);

        return authenticating ? null : <Component />;
    };

    return Authenticated;
};

export default StoryInstanceOption;
