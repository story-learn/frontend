import { IAccount } from "../components/Accounts/Account";
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
    likes: { data: HomeStory[]; page: number; pages: number };
    stories: { data: HomeStory[]; page: number; pages: number };
    followers: { data: IAccount[]; page: number; pages: number };
    following: { data: IAccount[]; page: number; pages: number };
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

export type TabDataFetched = {
    type: "profile_tab_data_fetched";
    payload: {
        data: (HomeStory | IAccount)[];
        page: number;
        pages: number;
        type: "likes" | "stories" | "followers" | "following";
    };
};

export type TabDataUpdated = {
    type: "profile_tab_data_updated";
    payload: {
        data: (HomeStory | IAccount)[];
        type: "likes" | "stories" | "followers" | "following";
    };
};

type ProfileRouteChanged = {
    type: "profile_route_changed";
    // payload: {};
};

// use this when you want to update the state of the profile
// e.g when user follows or unfollows a user, update following/followers count
type UpdateTabDataCount = {
    type: "profile_update_tab_data_count";
    payload: {
        tab: "Stories" | "Likes" | "Followers" | "Following";
        value: number;
    };
};

export type Action =
    | MainProfile
    | ProfileTabs
    | TabDataFetched
    | TabDataUpdated
    | ProfileRouteChanged
    | UpdateTabDataCount;

export const InitialProfileState: ProfileState = {
    main: {
        data: undefined,
        loading: true,
        error: "error",
    },
    likes: { data: [], page: 1, pages: 1 },
    stories: { data: [], page: 1, pages: 1 },
    followers: { data: [], page: 1, pages: 1 },
    following: { data: [], page: 1, pages: 1 },
    tabs: {
        lists: [
            // { tab: "Stories", value: 0, key: "created_stories_count" },
            // { tab: "Likes", value: null, key: "created_stories_count" },
            // { tab: "Followers", value: 0, key: "created_stories_count" },
            // { tab: "Following", value: 0, key: "created_stories_count" },

            { tab: "Stories", value: 0, key: "created_stories_count" },
            // { tab: "Likes", value: null, key: "liked_stories_count" },
            { tab: "Likes", value: 0, key: "liked_stories_count" },
            { tab: "Followers", value: 0, key: "followers_count" },
            { tab: "Following", value: 0, key: "following_count" },
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

    if (type === "profile_route_changed") {
        let selected = state.tabs.selected;
        state = { ...InitialProfileState };
        // state = { ...state, tabs: { ...state.tabs, selected } };
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

    if (type === "profile_tab_data_fetched") {
        let {
            payload: { data, page, pages, type },
        } = action as TabDataFetched;

        data = returnUniqueArrayObject(
            [...state[type].data, ...data],
            "id"
        ) as (HomeStory | IAccount)[];

        state = { ...state, [type]: { data, page, pages } };
    }

    if (type === "profile_tab_data_updated") {
        let {
            payload: { data, type },
        } = action as TabDataUpdated;

        state = { ...state, [type]: { ...state[type], data } };
    }

    if (type === "profile_update_tab_data_count") {
        let {
            payload: { tab, value },
        } = action as UpdateTabDataCount;

        let { lists } = state.tabs;

        let newTab = lists.find((list) => list.tab === tab);
        if (newTab) {
            newTab.value = value;
            // newTab = { ...newTab, value };
        }

        state = { ...state, tabs: { ...state.tabs, lists } };
    }

    return state;
};
