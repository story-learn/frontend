import { FC } from "react";
import { Story } from "./../../components";
import { HomeStory } from "../../interfaces";

interface IStories {
    stories: HomeStory[];
}

const Stories: FC<IStories> = ({ stories }) => {
    return (
        <ul>
            {stories.map((story, index) => (
                <Story {...story} key={index} />
            ))}
        </ul>
    );
};

export default Stories;
