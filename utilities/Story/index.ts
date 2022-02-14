import axios, { AxiosInstance } from "axios";
import { StoryRoutes } from "../../configs/story";
import { StoryUpload as Story } from "../../interfaces";

export const createStory = async (
    stories: Story[],
    storyInstance: AxiosInstance
) => {
    let frames = stories.map(({ type, value, imageVal }) =>
        type === "Image"
            ? { image: imageVal, text: "" }
            : { image: "", text: value }
    );

    try {
        await storyInstance.post(StoryRoutes.CREATE_STORY, { frames });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("errors", error.response?.data);
        }
        throw error;
    }
};
