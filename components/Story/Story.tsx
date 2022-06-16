import Link from "next/link";
import Image from "next/image";
import { FC, MouseEventHandler } from "react";
import { HomeStory } from "../../interfaces";
import { LoveIcon, ShareIcon, LoveIconOutline } from "../SVGs";
import { Profile, StoryContentActions, Notification } from "./../../components";
import { StyledStory } from "./StyledStory";
import { getTimeAgo } from "../../utilities/getTimeAgo";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { copyStoryLinkToClipBoard, likeStory } from "../../utilities/Story";
import { IStories } from "./Stories";
import useStoryRequest from "../../Hooks/useStoryRequest";
// import { useAuth } from "../../context/AuthContext";
import { TOAST_IDS } from "../../Constants";
import { bookmarkStory } from "./../../utilities/Story/index";
import { useAuth } from "../../Hooks/useAuth";

export interface IStory
    extends HomeStory,
        Pick<
            IStories,
            "handleFollowCreator" | "handleLikeStory" | "handleBookmarkStory"
        > {}

const Story: FC<IStory> = ({
    user,
    created,
    frames: { image, text },
    id,
    likes,
    following_story_creator,
    handleFollowCreator,
    handleLikeStory,
    user_liked_story,
    user_bookmarked_story,
    handleBookmarkStory,
}) => {
    const { user: loggdInUser } = useAuth();
    const { storyInstance } = useStoryRequest();
    let createdInMilliSeconds = new Date(created).getTime();
    let timeAgo = getTimeAgo(createdInMilliSeconds);

    const handleShareStory: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await copyStoryLinkToClipBoard(`/stories/${id}`);
            toast.custom(<Notification type="success" shortText="Copied" />, {
                id: String(TOAST_IDS.ClipBoard),
            });
        } catch (error) {
            toast.custom(
                <Notification type="error" shortText="Error copying link" />,
                { id: String(TOAST_IDS.ClipBoard) }
            );
        }
    };

    const onLikeOrUnlikeStory = async () => {
        // if (!storyInstance) return;

        if (!loggdInUser) {
            return toast.custom(
                <Notification type="error" shortText="You are not logged In" />,
                { id: String(TOAST_IDS.Auth) }
            );
        }

        try {
            // update UI immediately
            handleLikeStory(id, user_liked_story);
            await likeStory(storyInstance, id, user_liked_story);
        } catch (error) {
            // revert UI if there is an error
            handleLikeStory(id, !user_liked_story, true);
            console.log(error);
        }
    };

    const onBookmarkStory = async () => {
        // if (!storyInstance) return;

        if (!loggdInUser) {
            return toast.custom(
                <Notification type="error" shortText="You are not logged In" />,
                { id: String(TOAST_IDS.Auth) }
            );
        }

        try {
            // update UI immediately
            handleBookmarkStory(id, !user_bookmarked_story);

            await bookmarkStory(storyInstance, id, user_bookmarked_story);
            toast.custom(
                <Notification
                    type="success"
                    shortText={`Story ${
                        user_bookmarked_story
                            ? "removed from bookmarks"
                            : "bookmarked"
                    } successfully!`}
                />,
                { id: String(TOAST_IDS.Bookmark) }
            );
        } catch (error) {
            // revert UI if there is an error
            handleBookmarkStory(id, user_bookmarked_story);
        }
    };

    return (
        <StyledStory user_liked_story={user_liked_story}>
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
                                handleFollowCreator={handleFollowCreator}
                                handleBookmarkStory={onBookmarkStory}
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
                    <button
                        className={`story__actions-bookmark`}
                        onClick={onBookmarkStory}
                    >
                        {user_bookmarked_story ? (
                            <BsFillBookmarkFill />
                        ) : (
                            <BsBookmark />
                        )}
                    </button>
                    <button
                        className="story__actions-like"
                        onClick={onLikeOrUnlikeStory}
                    >
                        {user_liked_story ? <LoveIcon /> : <LoveIconOutline />}
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
