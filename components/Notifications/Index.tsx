import { FC } from "react";
import { Toaster } from "react-hot-toast";

const Notifications: FC = () => {
    return (
        <Toaster
            toastOptions={{
                duration: 1_333_000,
            }}
        />
    );
};

export default Notifications;
