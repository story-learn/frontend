import Link from "next/link";
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
import { getTimeAgo } from "../../utilities/getTimeAgo";

const Story: FC<HomeStory> = ({
    user,
    created,
    frames: { image, text },
    id,
}) => {
    let createdInMilliSeconds = new Date(created).getTime();
    let timeAgo = getTimeAgo(createdInMilliSeconds);

    return (
        <StyledStory>
            <article className="story">
                <Link href={`/`}>
                    <a className="story__link story__contents">
                        <header className="story__header">
                            <div>
                                <Profile
                                    firstName={user.first_name}
                                    lastName={user.last_name}
                                    userName={user.username}
                                    // wait for backend to include profile image in the user's object
                                    imgSrc=""
                                />
                                <div className="story__posted">{timeAgo}</div>
                            </div>
                            <StoryContentActions user={user} />
                        </header>
                        <div className="story__main">
                            {text ? (
                                <p className="story__main-text">{text}</p>
                            ) : (
                                <figure className="story__main-img">
                                    <Image
                                        src={image as string}
                                        alt=""
                                        width={200}
                                        height={200}
                                        layout="responsive"
                                        objectFit="cover"
                                    />
                                </figure>
                            )}
                        </div>
                    </a>
                </Link>
                <div className="story__actions">
                    {/* <p className="story__actions-view">
                        <ViewIcon />
                        {4}
                    </p> */}
                    <button className="story__actions-like">
                        <LoveIcon />
                        {5}
                    </button>
                    <button className="story__actions-share">
                        <ShareIcon />
                        {/* {7} */}
                    </button>
                </div>
            </article>
        </StyledStory>
    );
};

export default Story;
