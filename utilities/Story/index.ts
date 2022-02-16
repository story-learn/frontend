import axios, { AxiosInstance } from "axios";
import { StoryRoutes } from "../../configs/story";
// import { StoryUpload as Story } from "../../interfaces";
import { FrameUpload as Frame, HomeStory } from "../../interfaces";

export const createStory = async (
    stories: Frame[],
    storyInstance: AxiosInstance
) => {
    let frames = stories.map(({ type, value, imageVal }) =>
        type === "Image"
            ? { image: imageVal, text: "" }
            : { image: "", text: value }
    );

    try {
        let result = await storyInstance.post<HomeStory>(
            StoryRoutes.CREATE_STORY,
            {
                frames,
            }
        );
        let newStory = result.data;
        return newStory;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("errors", error.response?.data);
        }
        throw error;
    }
};
