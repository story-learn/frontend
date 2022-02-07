import { createContext, Dispatch, FC, useContext, useReducer } from "react";
import {
    Action,
    CounterState,
    InitialStoryState,
    reducer,
} from "../Reducer/Story";

interface IStories {
    stories: CounterState;
    dispatchStories: Dispatch<Action>;
}

const StoriesContext = createContext<IStories | undefined>(undefined);

export const StoriesProvider: FC = ({ children }) => {
    const [stories, dispatchStories] = useReducer(reducer, InitialStoryState);

    return (
        <StoriesContext.Provider value={{ stories, dispatchStories }}>
            {children}
        </StoriesContext.Provider>
    );
};

export const useStories = () => {
    let context = useContext(StoriesContext);

    if (context === undefined) {
        throw new Error("usestories must be within StoriesProvider");
    }

    return context;
};
