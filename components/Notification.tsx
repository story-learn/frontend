import { FC } from "react";
import { Toaster } from "react-hot-toast";

const Notification: FC = () => {
    return <Toaster toastOptions={{ className: "notification" }} />;
};

export default Notification;
