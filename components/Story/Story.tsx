import { FC } from "react";
import {
    LoveIcon,
    ShareIcon,
    ThreeDotsHorizontalIcon,
    ViewIcon,
} from "../SVGs";
import { Profile, StoryContentActions } from "./../../components";
import { StyledStory } from "./StyledStory";

export interface StoryP {
    user: {
        name: string;
        username: string;
        profilePic: string;
    };
    firstSlide: string;
    views: number;
    likes: number;
    share: number;
}

const Story: FC<StoryP> = ({ firstSlide, likes, share, user, views }) => {
    return (
        <StyledStory>
            <article className="story">
                <div className="story__contents">
                    <header className="story__header">
                        <div>
                            <Profile />
                            <div className="story__posted">10 minutes ago</div>
                        </div>
                        <StoryContentActions user={user} />
                    </header>
                    <p className="story__main">{firstSlide}</p>
                </div>
                <div className="story__actions">
                    <p className="story__actions-view">
                        <ViewIcon />
                        {views}
                    </p>
                    <button className="story__actions-like">
                        <LoveIcon />
                        {likes}
                    </button>
                    <button className="story__actions-share">
                        <ShareIcon />
                        {share}
                    </button>
                </div>
            </article>
        </StyledStory>
    );
};

export default Story;
