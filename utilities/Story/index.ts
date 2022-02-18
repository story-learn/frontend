import axios, { AxiosInstance } from "axios";
import { Dispatch, FormEventHandler } from "react";
import { StoryRoutes } from "../../configs/story";
// import { StoryUpload as Story } from "../../interfaces";
import { FrameUpload as Frame } from "../../interfaces";
import { Action } from "../../Reducer/Story";

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
        await storyInstance.post(StoryRoutes.CREATE_STORY, { frames });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("errors", error.response?.data);
        }
        throw error;
    }
};

export const searchStory = (
    search: string,
    dispatchStories: Dispatch<Action>
) => {
    if (!search) return;

    dispatchStories({ type: "search", payload: { value: search } });
};
