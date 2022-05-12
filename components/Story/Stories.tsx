import { FC, MouseEventHandler } from "react";
import { Story } from "./../../components";
import { HomeStory } from "../../interfaces";
import { IStoryAction } from "./StoryContentActions";

export type HandleFollowCreator = (
    following_story_creator: IStoryAction["following_story_creator"],
    creatorId: IStoryAction["user"]["id"]
) => void;
export interface IStories {
    stories: HomeStory[];
    handleFollowCreator: HandleFollowCreator;
    handleLikeStory: (storyId: number, userLikedStory: boolean) => void;
}

const Stories: FC<IStories> = ({
    stories,
    handleFollowCreator,
    handleLikeStory,
}) => {
    // use this in testing mode to remove stories that have neither image or text
    stories = stories.filter(({ frames: { image, text } }) => image || text);

    return (
        <ul>
            {stories.map((story) => (
                <Story
                    {...story}
                    key={story.id}
                    handleFollowCreator={handleFollowCreator}
                    handleLikeStory={handleLikeStory}
                />
            ))}
        </ul>
    );
};

export default Stories;
