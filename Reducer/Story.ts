import { HomeStory } from "../interfaces";
import { returnUniqueArrayObject } from "../utilities/returnUniqueArrayObject";

type Status =
    | "empty" // no stories have been fetched or no story has been added
    | "notEmpty";

export type CounterState = {
    status: Status;
    data: any;
    loading: boolean;
    currentPage: number;
    totalPages: number;
};

type FetchStoriesAction = {
    type: "fetch_stories";
    payload: { stories: HomeStory[]; currentPage: number; totalPages: number };
};

type UploadNewStoryAction = {
    type: "upload_new_story";
    payload: HomeStory;
};

export type Action = FetchStoriesAction | UploadNewStoryAction;

export const InitialStoryState: CounterState = {
    status: "empty",
    data: [],
    loading: false,
    currentPage: 1,
    totalPages: 1,
};

export const reducer = (state: CounterState, action: Action) => {
    let prevStories = [...state.data];

    if (action.type === "fetch_stories") {
        let { currentPage, totalPages, stories } = action.payload;

        let data = returnUniqueArrayObject([...prevStories, ...stories], "id");

        state = { ...state, currentPage, totalPages, data };
    }

    if (action.type === "upload_new_story") {
        // testing purpose
        let newStory = action.payload;

        let data = [newStory, ...prevStories];

        state = { ...state, data };
    }

    return state;
};
