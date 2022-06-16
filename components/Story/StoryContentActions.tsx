import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MouseEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IconType } from "react-icons";
import { BsPerson } from "react-icons/bs";
import { TOAST_IDS } from "../../Constants";
import { useAuth } from "../../context/AuthContext";
// import { useStories } from "../../context/StoriesContext";
import { useStoryAction } from "../../Hooks/useStoryAction";
// import useStoryRequest from "../../Hooks/useStoryRequest";
import { HomeStory } from "../../interfaces";
import Notification from "../Notifications/Notification";
import {
    BookmarkIcon,
    FollowUserIcon,
    LinkIcon,
    ThreeDotsHorizontalIcon,
    ViewIcon,
} from "../SVGs";
import { IStories } from "./Stories";
import { StyledStoryContentActions } from "./StyledStoryContentActions";

type StoryAction = Pick<HomeStory, "user" | "id" | "following_story_creator">;

export interface IStoryAction
    extends StoryAction,
        Pick<IStories, "handleFollowCreator"> {
    handleCopyStory: MouseEventHandler<HTMLButtonElement>;
    handleBookmarkStory: MouseEventHandler<HTMLButtonElement>;
}

type Actions = {
    Icon: FC<{}> | IconType;
    text: string;
    action?: Function;
    href?: string;
    className?: string;
}[];

const StoryContentActions: FC<IStoryAction> = ({
    user: { username, id: creatorId },
    id,
    following_story_creator,
    handleCopyStory,
    handleFollowCreator,
    handleBookmarkStory,
}) => {
    const { push } = useRouter();
    const { user } = useAuth();
    // const { storyInstance } = useStoryRequest();
    // let { dispatchStories } = useStories();
    const { storyFollowProfile } = useStoryAction();

    const contentRef = useRef<HTMLUListElement>(null);
    const [followActionSubmitted, setFollowActionSubmitted] = useState(false);

    let actions: Actions = [
        {
            Icon: FollowUserIcon,
            text: `${
                following_story_creator ? "Unfollow" : "Follow"
            } ${username}`,
            action: async () => {
                if (following_story_creator === null || !user)
                    return toast.custom(
                        <Notification
                            type="error"
                            shortText="You are not currently signed in!"
                        />,
                        { id: String(TOAST_IDS.Auth) }
                    );

                setFollowActionSubmitted(true);

                try {
                    await storyFollowProfile(
                        following_story_creator,
                        creatorId
                    );
                    handleFollowCreator(following_story_creator, creatorId);
                } catch (error) {
                    toast.custom(
                        <Notification
                            type="error"
                            shortText={`There was an error while trying to ${
                                following_story_creator ? "unfollow" : "follow"
                            } ${username}. Please try again later.`}
                        />
                    );
                } finally {
                    setFollowActionSubmitted(false);
                }
            },
            className: "story__contents-action--follow",
        },
        {
            Icon: BookmarkIcon,
            text: "Save Story",
            // action: () => {
            //     handleBookmarkStory
            // },
            action: handleBookmarkStory,
        },
        {
            Icon: ViewIcon,
            text: "Open Story",
            action: () => {
                push(`/stories/${id}`);
            },
        },
        {
            Icon: LinkIcon,
            text: "Copy Link",
            action: handleCopyStory,
        },
    ];

    if (user?.user_id === creatorId) {
        actions[0] = {
            Icon: BsPerson,
            text: "Go to profile",
            action: () => push(`/profiles/${user.user_id}`),
            className: "story__contents-action--follow",
        };
    }

    const handleContentActions: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        let actionsContainer = contentRef.current!;

        actionsContainer.classList.toggle("show");
    };

    return (
        <StyledStoryContentActions>
            <button
                className="story__contents-action"
                onClick={handleContentActions}
            >
                <ThreeDotsHorizontalIcon />
            </button>
            <ul ref={contentRef} className="story__contents-actions arrow">
                {actions.map(
                    ({ action, Icon, text, className, href }, index) => (
                        <li key={index} className={className || ""}>
                            <button
                                onClick={(e) => {
                                    // e.preventDefault();
                                    // e.stopPropagation();
                                    action?.(e);
                                    handleContentActions(e);
                                }}
                                disabled={
                                    (className ===
                                        "story__contents-action--follow" &&
                                        followActionSubmitted) ||
                                    false
                                }
                            >
                                <Icon />
                                <span>{text}</span>
                            </button>
                        </li>
                    )
                )}
            </ul>
        </StyledStoryContentActions>
    );
};

export default StoryContentActions;
