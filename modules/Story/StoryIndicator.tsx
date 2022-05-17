import { useRouter } from "next/router";
import React, { FC, MouseEventHandler } from "react";
import toast from "react-hot-toast";
import { Notification } from "../../components";
import { StyledStoryIndicator } from "../../components/Styles/StyledStoryPage";
import { ShareIcon } from "../../components/SVGs";
import { TOAST_IDS } from "../../Constants";
import { copyStoryLinkToClipBoard } from "../../utilities/Story";

interface IStoryIndicator {
    stories: any[];
    active: number;
}

const StoryIndicator: FC<IStoryIndicator> = ({ active, stories }) => {
    const { asPath } = useRouter();

    const shareStoryUrl: MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await copyStoryLinkToClipBoard(asPath);
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

    return (
        <StyledStoryIndicator
            className="story__header"
            numberOfIndicators={stories.length}
        >
            <div className="story__indicators">
                {stories.map((_, i) => {
                    return (
                        <div
                            key={i}
                            className={`story__indicators-item ${
                                active >= i ? "active" : ""
                            }`}
                        />
                    );
                })}
            </div>
            <button className="story__header-share" onClick={shareStoryUrl}>
                <ShareIcon />
            </button>
        </StyledStoryIndicator>
    );
};

export default StoryIndicator;
