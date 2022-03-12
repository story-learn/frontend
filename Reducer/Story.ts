import { HomeStory, Search } from "../interfaces";
import { returnUniqueArrayObject } from "../utilities/returnUniqueArrayObject";

type Status =
    | "empty" // no stories have been fetched or no story has been added
    | "notEmpty";

export type CounterState = {
    status: Status;
    data: HomeStory[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    search: Search;
};

type FetchStoriesAction = {
    type: "fetch_stories";
    payload: { stories: HomeStory[]; currentPage: number; totalPages: number };
};

type UploadNewStoryAction = {
    type: "upload_new_story";
    payload: HomeStory;
};

type StorySearch = {
    type: "search";
    payload: {
        [key: string]: string | boolean;
    };
};

export type Action = FetchStoriesAction | UploadNewStoryAction | StorySearch;

export const InitialStoryState: CounterState = {
    status: "empty",
    data: [],
    loading: false,
    currentPage: 1,
    totalPages: 1,
    search: {
        value: "",
        category: "story",
    },
};

export const reducer = (state: CounterState, action: Action) => {
    let prevStories = [...state.data];

    if (action.type === "fetch_stories") {
        let { currentPage, totalPages, stories } = action.payload;

        let data = returnUniqueArrayObject(
            [...prevStories, ...stories],
            "id"
        ) as HomeStory[];

        state = { ...state, currentPage, totalPages, data };
    }

    if (action.type === "upload_new_story") {
        // testing purpose
        let newStory = action.payload;

        let data = [newStory, ...prevStories];

        state = { ...state, data };
    }

    if (action.type === "search") {
        let prevSearch = state.search;

        state = { ...state, search: { ...prevSearch, ...action.payload } };
    }

    return state;
};
