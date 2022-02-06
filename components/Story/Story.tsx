import Image from "next/image";
import { FC } from "react";
import { HomeStory } from "../../interfaces";
import {
    LoveIcon,
    ShareIcon,
    ThreeDotsHorizontalIcon,
    ViewIcon,
} from "../SVGs";
import { Profile, StoryContentActions } from "./../../components";
import { StyledStory } from "./StyledStory";
import tempoImage from "./../../public/assests/jpgs/Screenshot (72).png";

const Story: FC<HomeStory> = ({
    user,
    created,
    frames: { image, text },
    id,
}) => {
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
                    <div className="story__main">
                        {text ? (
                            <p className="story__main-text">{text}</p>
                        ) : (
                            <figure className="story__main-img">
                                <Image
                                    src={tempoImage}
                                    alt=""
                                    width={200}
                                    height={200}
                                    layout="responsive"
                                    objectFit="cover"
                                />
                            </figure>
                        )}
                    </div>
                </div>
                <div className="story__actions">
                    <p className="story__actions-view">
                        <ViewIcon />
                        {4}
                    </p>
                    <button className="story__actions-like">
                        <LoveIcon />
                        {5}
                    </button>
                    <button className="story__actions-share">
                        <ShareIcon />
                        {7}
                    </button>
                </div>
            </article>
        </StyledStory>
    );
};

export default Story;
