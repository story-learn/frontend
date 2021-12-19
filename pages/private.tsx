import { ProtectRoute } from "../components";

const Private = () => {
    return (
        <>
            <main>Example of private route</main>
        </>
    );
};

export default ProtectRoute(Private);
