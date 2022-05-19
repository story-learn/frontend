import { AxiosInstance } from "axios";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";

/**
 * Sends a request to follow a profile
 * @param storyInstance The AxiosInstance to use for the request
 * @param profileId id of the profile you want to follow
 */
export const followProfile = async (
    storyInstance: AxiosInstance,
    profileId: number
) => {
    let followUrl = `${BASE_URLS.Story}${StoryRoutes.FOLLOW_PROFILE}`;

    try {
        await storyInstance.post(followUrl, {
            person_user_follows_id: profileId,
        });
    } catch (error) {
        throw error;
    }
};

/**
 * Send a request to unfollow a profile
 * @param storyInstance The AxiosInstance to use for the request
 * @param profileId id of the profile you want to unfollow
 */
export const unFollowProfile = async (
    storyInstance: AxiosInstance,
    profileId: number
) => {
    let unFollowUrl = `${BASE_URLS.Story}${StoryRoutes.UNFOLLOW_PROFILE}/${profileId}/`;

    try {
        await storyInstance.delete(unFollowUrl);
    } catch (error) {
        throw error;
    }
};
