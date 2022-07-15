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

export type StoriesFetched = {
    type: "stories_fetched";
    payload: {
        data: HomeStory[];
        page: number;
        pages: number;
        type: "likes" | "stories";
    };
};

export type PeopleFetched = {
    type: "people_fetched";
    payload: {
        data: IAccount[];
        page: number;
        pages: number;
        type: "followers" | "following";
    };
};

export type StoriesUpdated = {
    type: "stories_updated";
    payload: {
        data: HomeStory[];
        type: "likes" | "stories";
    };
};

export type PeopleUpdated = {
    type: "people_updated";
    payload: {
        data: IAccount[];
        type: "followers" | "following";
    };
};

export type Action =
    | MainProfile
    | ProfileTabs
    | StoriesFetched
    | StoriesUpdated
    | PeopleUpdated
    | PeopleFetched;

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

    if (type === "stories_fetched") {
        let {
            payload: { data, page, pages, type },
        } = action as StoriesFetched;

        data = returnUniqueArrayObject(
            [...state[type].data, ...data],
            "id"
        ) as HomeStory[];

        state = { ...state, [type]: { data, page, pages } };
    }

    if (type === "stories_updated") {
        let {
            payload: { data, type },
        } = action as StoriesUpdated;

        state = { ...state, [type]: { ...state[type], data } };
    }

    if (type === "people_fetched") {
        let {
            payload: { data, page, pages, type },
        } = action as PeopleFetched;

        data = returnUniqueArrayObject(
            [...state[type].data, ...data],
            "id"
        ) as IAccount[];

        state = { ...state, [type]: { data, page, pages } };
    }

    if (type === "people_updated") {
        let {
            payload: { data, type },
        } = action as PeopleUpdated;

        state = { ...state, [type]: { ...state[type], data } };
    }

    return state;
};
