import { useRouter } from "next/router";
import { FC, MouseEventHandler, useRef } from "react";
import { HomeStory } from "../../interfaces";
import {
    BookmarkIcon,
    FollowUserIcon,
    LinkIcon,
    ThreeDotsHorizontalIcon,
    ViewIcon,
} from "../SVGs";
import { StyledStoryContentActions } from "./StyledStoryContentActions";

type StoryAction = Pick<HomeStory, "user" | "id">;

interface IStoryAction extends StoryAction {
    handleCopyStory: MouseEventHandler<HTMLButtonElement>;
}

const StoryContentActions: FC<IStoryAction> = ({
    user: { username },
    id,
    handleCopyStory,
}) => {
    const { push } = useRouter();

    let actions = [
        {
            Icon: FollowUserIcon,
            text: `Follow ${username} Ademola Peace Olayinka`,
            action: () => {
                console.log("Follow");
            },
            className: "story__contents-action--follow",
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
                push(`/stories/${id}`);
            },
        },
        {
            Icon: LinkIcon,
            text: "Copy Link",
            action: handleCopyStory,
        },
    ];

    const contentRef = useRef<HTMLUListElement>(null);

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
                                e.preventDefault();
                                action(e);
                                handleContentActions(e);
                            }}
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
