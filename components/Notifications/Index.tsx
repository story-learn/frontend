import { FC } from "react";
import { Toaster } from "react-hot-toast";

const Notifications: FC = () => {
    return (
        <Toaster
            toastOptions={{
                duration: 3_000_000,
            }}
        />
    );
};

export default Notifications;
