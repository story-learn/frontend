import Link from "next/link";
import Image from "next/image";
import { FC, MouseEventHandler } from "react";
import { HomeStory } from "../../interfaces";
import { LoveIcon, ShareIcon } from "../SVGs";
import { Profile, StoryContentActions, Notification } from "./../../components";
import { StyledStory } from "./StyledStory";
import { getTimeAgo } from "../../utilities/getTimeAgo";
import { BsBookmark } from "react-icons/bs";
import toast from "react-hot-toast";
import { copyStoryLinkToClipBoard } from "../../utilities/Story";

const Story: FC<HomeStory> = ({
    user,
    created,
    frames: { image, text },
    id,
    likes,
    following_story_creator,
}) => {
    let createdInMilliSeconds = new Date(created).getTime();
    let timeAgo = getTimeAgo(createdInMilliSeconds);

    const handleShareStory: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await copyStoryLinkToClipBoard(`/stories/${id}`);
            toast.custom(<Notification type="success" shortText="Copied" />);
        } catch (error) {
            toast.custom(
                <Notification type="error" shortText="Error copying link" />
            );
        }
    };

    return (
        <StyledStory>
            <article className="story">
                <Link href={`/stories/${id}`}>
                    <a className="story__link story__contents">
                        <header className="story__header">
                            <div>
                                <Profile
                                    id={user.id}
                                    first_name={user.first_name}
                                    last_name={user.last_name}
                                    username={user.username}
                                    // wait for backend to include profile image in the user's object
                                    imgSrc=""
                                />
                                <div className="story__posted">{timeAgo}</div>
                            </div>
                            <StoryContentActions
                                user={user}
                                id={id}
                                handleCopyStory={handleShareStory}
                                following_story_creator={
                                    following_story_creator
                                }
                            />
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
                    <button className="story__actions-bookmark">
                        <BsBookmark />
                    </button>
                    <button className="story__actions-like">
                        <LoveIcon />
                        {likes}
                    </button>
                    <button
                        className="story__actions-share"
                        onClick={handleShareStory}
                    >
                        <ShareIcon />
                    </button>
                </div>
            </article>
        </StyledStory>
    );
};

export default Story;
