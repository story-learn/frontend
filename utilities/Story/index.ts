import { Story } from "../../pages/upload";

export const createStory = async (stories: Story[]) => {
    let data = stories.map(({ type, value }) => {
        if (type === "Image") return { image: value, text: "" };

        return { image: "", text: value };
    });
    console.log(data);

    try {
        //
    } catch (error) {
        //
    }
};
