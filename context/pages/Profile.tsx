import { createContext, Dispatch, FC, useContext, useReducer } from "react";
import {
    Action,
    InitialProfileState,
    ProfileState,
    reducer,
} from "../../Reducer/Profile";

interface IProfileContext {
    profile: ProfileState;
    dispatchProfile: Dispatch<Action>;
}

export const ProfileContext = createContext<IProfileContext | undefined>(
    undefined
);

export const ProfileProvider: FC = ({ children }) => {
    const [profile, dispatchProfile] = useReducer(reducer, InitialProfileState);

    return (
        <ProfileContext.Provider
            value={{
                profile,
                dispatchProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => {
    let context = useContext(ProfileContext);

    if (context === undefined) {
        throw new Error("useprofile must be within ProfileProvider");
    }

    return context;
};
