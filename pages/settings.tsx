import { FC } from "react";
import { ProtectRoute } from "../components";

const Settings: FC = () => {
    return (
        <>
            <main>
                <h1>settings</h1>
            </main>
        </>
    );
};

export default ProtectRoute(Settings);
