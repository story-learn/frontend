import axios, { AxiosInstance } from "axios";
import { Dispatch } from "react";
import { StoryRoutes } from "../../configs/story";
import { FrameUpload as Frame, HomeStory } from "../../interfaces";
import { Action } from "../../Reducer/Story";
import { copyToClipBoard } from "../copyToClipBoard";

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

export const searchStory = (
    search: string,
    dispatchStories: Dispatch<Action>
) => {
    if (!search) return;

    dispatchStories({ type: "search", payload: { value: search } });
};

export const copyStoryLinkToClipBoard = async (storyPath: string) => {
    try {
        await copyToClipBoard(`https://storylearn.netlify.app${storyPath}`);
    } catch (error) {
        throw error;
    }
};
