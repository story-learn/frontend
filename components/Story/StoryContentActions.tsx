import { FC, LegacyRef, useRef } from "react";
import {
    BookmarkIcon,
    FollowUserIcon,
    LinkIcon,
    ThreeDotsHorizontalIcon,
    ViewIcon,
} from "../SVGs";
import { StoryP } from "./Story";
import { StyledStoryContentActions } from "./StyledStoryContentActions";

type StoryAction = Pick<StoryP, "user">;

const StoryContentActions: FC<StoryAction> = ({ user: { username } }) => {
    let actions = [
        {
            Icon: FollowUserIcon,
            text: `Follow ${username}`,
            action: () => {
                console.log("Follow");
            },
        },
        {
            Icon: BookmarkIcon,
            text: "Save Story",
            action: () => {
                console.log("Save");
            },
        },
        {
            Icon: ViewIcon,
            text: "Open Story",
            action: () => {
                console.log("open story");
            },
        },
        {
            Icon: LinkIcon,
            text: "Copy Link",
            action: () => {
                console.log("copy Link");
            },
        },
    ];

    const contentRef = useRef<HTMLUListElement>(null);

    const handleContentActions = () => {
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
                {actions.map(({ action, Icon, text }, index) => (
                    <li key={index}>
                        <button onClick={action}>
                            <Icon />
                            {text}
                        </button>
                    </li>
                ))}
            </ul>
        </StyledStoryContentActions>
    );
};

export default StoryContentActions;
