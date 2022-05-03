import { IStoryAction } from "../components/Story/StoryContentActions";
import { useStories } from "../context/StoriesContext";
import { followProfile, unFollowProfile } from "../utilities/Profile";
import useStoryRequest from "./useStoryRequest";

export const useStoryAction = () => {
    const { storyInstance } = useStoryRequest();
    let { dispatchStories } = useStories();

    const storyFollowProfile = async (
        following_story_creator: IStoryAction["following_story_creator"],
        creatorId: IStoryAction["user"]["id"]
    ) => {
        try {
            following_story_creator
                ? await unFollowProfile(storyInstance, creatorId)
                : await followProfile(storyInstance, creatorId);
            dispatchStories({
                type: "story_creator_followed_action",
                payload: {
                    creatorId,
                    following_story_creator: !following_story_creator,
                },
            });
        } catch (error) {
            console.log("error");
            throw error;
        }
    };

    return { storyFollowProfile };
};
