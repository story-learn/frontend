import { useRouter } from "next/router";
import { FC, MouseEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
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
import { StyledStoryContentActions } from "./StyledStoryContentActions";

type StoryAction = Pick<HomeStory, "user" | "id" | "following_story_creator">;

export interface IStoryAction extends StoryAction {
    handleCopyStory: MouseEventHandler<HTMLButtonElement>;
}

const StoryContentActions: FC<IStoryAction> = ({
    user: { username, id: creatorId },
    id,
    following_story_creator,
    handleCopyStory,
}) => {
    const { push } = useRouter();
    const { user } = useAuth();
    // const { storyInstance } = useStoryRequest();
    // let { dispatchStories } = useStories();
    const { storyFollowProfile } = useStoryAction();

    const contentRef = useRef<HTMLUListElement>(null);
    const [followActionSubmitted, setFollowActionSubmitted] = useState(false);

    let actions = [
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
                        />
                    );

                setFollowActionSubmitted(true);
                try {
                    await storyFollowProfile(
                        following_story_creator,
                        creatorId
                    );
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
            action: () => {
                toast.custom(
                    <Notification
                        type="success"
                        shortText={`Story saved successfully!`}
                    />
                );
            },
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
                {actions.map(({ action, Icon, text, className }, index) => (
                    <li key={index} className={className || ""}>
                        <button
                            onClick={(e) => {
                                // e.preventDefault();
                                // e.stopPropagation();
                                action(e);
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
                ))}
            </ul>
        </StyledStoryContentActions>
    );
};

export default StoryContentActions;
