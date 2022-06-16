import { HomeStory, Profile } from "../interfaces";
import { Tabs } from "../pages/profiles/[id]";
import { returnUniqueArrayObject } from "../utilities/returnUniqueArrayObject";

interface Fetch<Data> {
    data: Data;
    loading: boolean;
    error: string;
}

export type ProfileState = {
    main: Fetch<Profile | undefined>;
    // likes: Fetch<any>;
    likes: { data: HomeStory[]; page: number; pages: number };
    // stories: Fetch<HomeStory[]>;
    stories: { data: HomeStory[]; page: number; pages: number };
    tabs: Tabs;
};

export type MainProfile = {
    type: "profile_main";
    payload: Fetch<Profile | undefined>;
};

export type TabSelected = {
    type: "profile_tab_selected";
    payload: string;
};

export type ProfileTabs = TabSelected;

export type ProfileStories = {
    type: "profile_stories";
    payload: { data: HomeStory[]; page: number; pages: number };
};

export type StoriesLikedUnliked = {
    type: "stories_liked_or_unliked";
    payload: {
        data: HomeStory[];
        type: "profileStories" | "profileStoriesLikes"; // handles stories/likes tab
    };
};

export type ProfileStoriesLikes = {
    type: "profile_stories_likes";
    payload: { data: HomeStory[]; page: number; pages: number };
};

// this covers update for stories/likes tab
type StoriesTypeUpdated = {
    type: "stories_updated";
    payload: {
        data: HomeStory[];
        type: "profileStories" | "profileStoriesLikes";
    };
};

// TODO: Refactor other types to use this
type StoriesTypeFetched = {
    type: "stories_fetched";
    payload: {
        data: HomeStory[];
        type: "profileStories" | "profileStoriesLikes";
        page: number;
        pages: number;
    };
};

export type Action =
    | MainProfile
    | ProfileTabs
    | ProfileStories
    | ProfileStoriesLikes
    | StoriesLikedUnliked
    | StoriesTypeUpdated;

export const InitialProfileState: ProfileState = {
    main: {
        data: undefined,
        loading: true,
        error: "error",
    },
    // likes: { data: [], loading: true, error: "error" },
    likes: { data: [], page: 1, pages: 1 },
    stories: { data: [], page: 1, pages: 1 },
    tabs: {
        lists: [
            { tab: "Stories", value: 0, key: "created_stories_count" },
            { tab: "Likes", value: null, key: "created_stories_count" },
            { tab: "Followers", value: 0, key: "created_stories_count" },
            { tab: "Following", value: 0, key: "created_stories_count" },
        ],
        selected: "",
    },
};

export const reducer = (state: ProfileState, action: Action) => {
    let { type } = action;

    if (type === "profile_main") {
        let { payload } = action as MainProfile;
        let { main, tabs } = state;
        let { lists } = tabs;

        main = {
            ...main,
            ...payload,
        };

        lists = [...lists].map((list) => {
            if (list.tab === "Followers") {
                list.value = payload.data?.followers_count || 0;
            } else if (list.tab === "Following") {
                list.value = payload.data?.following_count || 0;
            } else if (list.tab === "Likes") {
                list.value = payload.data?.liked_stories_count || 0;
            } else if (list.tab === "Stories") {
                list.value = payload.data?.created_stories_count || 0;
            }
            return list;
        });

        tabs = { ...tabs, lists };

        state = { ...state, main };
    }

    if (type === "profile_tab_selected") {
        let { payload } = action as TabSelected;
        state = {
            ...state,
            tabs: {
                ...state.tabs,
                selected: payload,
            },
        };
    }

    if (type === "profile_stories") {
        let {
            payload: { data, page, pages },
        } = action as ProfileStories;

        data = returnUniqueArrayObject(
            [...state.stories.data, ...data],
            "id"
        ) as HomeStory[];

        state = { ...state, stories: { data, page, pages } };
    }

    if (type === "profile_stories_likes") {
        let {
            payload: { data, page, pages },
        } = action as ProfileStoriesLikes;

        data = returnUniqueArrayObject(
            [...state.likes.data, ...data],
            "id"
        ) as HomeStory[];

        state = { ...state, likes: { data, page, pages } };
    }

    if (type === "stories_liked_or_unliked") {
        let {
            payload: { data, type },
        } = action as StoriesLikedUnliked;

        if (type === "profileStories") {
            state = {
                ...state,
                stories: {
                    ...state.stories,
                    data,
                },
            };
        } else if (type === "profileStoriesLikes") {
            state = {
                ...state,
                likes: {
                    ...state.likes,
                    data,
                },
            };
        }
    }

    if (type === "stories_updated") {
        let {
            payload: { data, type },
        } = action as StoriesTypeUpdated;

        if (type === "profileStories") {
            state = {
                ...state,
                stories: {
                    ...state.stories,
                    data,
                },
            };
        } else if (type === "profileStoriesLikes") {
            state = {
                ...state,
                likes: {
                    ...state.likes,
                    data,
                },
            };
        }
    }
    // console.log(state);

    return state;
};
