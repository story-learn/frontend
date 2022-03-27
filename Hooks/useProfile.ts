import { StoryRoutes } from "../configs/story";
import { BASE_URLS } from "../Constants";
import { useSWRFetch } from "./useSwrFetch";

export const useProfile = () => {
    const { data, error, loading } = useSWRFetch(
        `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE}/${1}`
    );

    return { data, error, loading };
};
