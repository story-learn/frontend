import { StoryRoutes } from "../configs/story";
import { BASE_URLS } from "../Constants";
import useStoryRequest from "./useStoryRequest";
import { useSWRFetch } from "./useSwrFetch";

export const useProfile = <Data>(id: string | undefined) => {
    const { storyInstance } = useStoryRequest();

    // let profileUrl = id && `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE}/${1}`;
    let profileUrl = id && `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE}/${id}`;

    return useSWRFetch<Data>(profileUrl, storyInstance);

    // const { data, error, loading,mutate } = useSWRFetch<Data>(profileUrl);

    // return { data, error, loading, mutate };
};
