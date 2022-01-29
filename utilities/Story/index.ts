import axios, { AxiosInstance } from "axios";
import { StoryRoutes } from "../../configs/story";
import { StoryUpload as Story } from "../../interfaces";

export const createStory = async (
    stories: Story[],
    storyInstance: AxiosInstance
) => {
    let frames = stories.map(({ type, value }) =>
        type === "Image"
            ? { image: value, text: "" }
            : { image: "", text: value }
    );

    try {
        let data = new FormData();
        data.append("frames", JSON.stringify(frames));

        await storyInstance.post(StoryRoutes.CREATE_STORY, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("errors", error.response?.data);
        }
        throw error;
    }
};
