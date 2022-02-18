import { FC } from "react";
import { Story } from "./../../components";
import { HomeStory } from "../../interfaces";

interface IStories {
    stories: HomeStory[];
}

const Stories: FC<IStories> = ({ stories }) => {
    // use this in testing mode to remove stories that have neither image or text
    stories = stories.filter(({ frames: { image, text } }) => image || text);

    return (
        <ul>
            {stories.map((story) => (
                <Story {...story} key={story.id} />
            ))}
        </ul>
    );
};

export default Stories;
