import axios, { AxiosInstance } from "axios";
import { Story } from "../../pages/upload";

export const createStory = async (
    stories: Story[],
    storyInstance: AxiosInstance
) => {
    let frames = stories.map(({ type, value }) => {
        if (type === "Image") return { image: value, text: "" };

        return { image: "", text: value };
    });
    let data = { frames };

    try {
        let result = await storyInstance.post(`/story/story/`, data);

        console.log(result);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("errors", error.response?.data);
        }
    }
};
