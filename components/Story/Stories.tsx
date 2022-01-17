import { FC } from "react";
import { Story } from "./../../components";
import { stories } from "../../data/stories";

const Stories: FC = () => {
    return (
        <ul>
            {stories.map((story, index) => (
                <Story {...story} key={index} />
            ))}
        </ul>
    );
};

export default Stories;
