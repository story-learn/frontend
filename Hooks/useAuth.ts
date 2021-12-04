import axios from "axios";
import { Authentication } from "../interfaces";

export const useAuth = () => {
    const signup = async (detail: Authentication) => {
        try {
            // let auth = await axios.post(
            //     "https://story-learn.herokuapp.com/auth/users",
            //     detail
            // );
            // console.log(auth);
            console.log("authenticating");
        } catch (error) {
            throw error;
        }
    };

    const login = () => {};

    return { signup, login };
};
