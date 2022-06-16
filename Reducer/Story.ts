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

type StoryCreatorFollowedAction = {
    type: "story_creator_followed_action";
    payload: { creatorId: number; following_story_creator: boolean };
};

type StoryLikedOrUnliked = {
    type: "story_liked_or_unliked";
    payload: { storyId: number; userLikedStory: boolean };
};

type StoryBookmarked = {
    type: "story_bookmarked_or_unbookmarked";
    payload: { storyId: number; bookmarked: boolean };
};

type StorySearch = {
    type: "search";
    payload: {
        [key: string]: string | boolean;
    };
};

export type Action =
    | FetchStoriesAction
    | UploadNewStoryAction
    | StorySearch
    | StoryCreatorFollowedAction
    | StoryLikedOrUnliked
    | StoryBookmarked;

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

    if (action.type === "story_creator_followed_action") {
        const { creatorId, following_story_creator } = action.payload;

        prevStories = prevStories.map((story) => {
            if (story.user.id === creatorId) {
                story.following_story_creator = following_story_creator;
            }

            return story;
        });
        state = { ...state, data: prevStories };
    }

    if (action.type === "story_liked_or_unliked") {
        const { storyId, userLikedStory } = action.payload;

        prevStories = prevStories.map((story) => {
            if (story.id === storyId) {
                let { likes, user_liked_story } = story;

                likes = userLikedStory ? likes - 1 : likes + 1;
                user_liked_story = !userLikedStory;

                story = {
                    ...story,
                    likes,
                    user_liked_story,
                };
            }
            return story;
        });

        state = { ...state, data: prevStories };
    }

    if (action.type === "story_bookmarked_or_unbookmarked") {
        const { storyId, bookmarked } = action.payload;

        prevStories = prevStories.map((story) => {
            if (story.id === storyId) {
                story.user_bookmarked_story = bookmarked;
            }
            return story;
        });

        state = { ...state, data: prevStories };
    }

    return state;
};
