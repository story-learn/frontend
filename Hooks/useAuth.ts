import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    let context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useauth must be within AuthProvider");
    }

    return context;
};
