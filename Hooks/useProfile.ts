import { StoryRoutes } from "../configs/story";
import { BASE_URLS } from "../Constants";
import { useSWRFetch } from "./useSwrFetch";

export const useProfile = <Data>(id: string | undefined) => {
    // let profileUrl = id && `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE}/${1}`;
    let profileUrl = id && `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE}/${id}`;

    return useSWRFetch<Data>(profileUrl);

    // const { data, error, loading,mutate } = useSWRFetch<Data>(profileUrl);

    // return { data, error, loading, mutate };
};
