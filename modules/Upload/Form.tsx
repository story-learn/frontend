import { FC } from "react";
import { UploadText, UploadImage } from "./index";
import { HandleStoryChange, Story } from "../../pages/upload";
import { Button } from "../../components";

export interface IForm {
    story: Story;
    stories: Story[];
    handleAddStories: () => void;
    handleStoryChange: HandleStoryChange;
    handleCloseStoryModal: () => void;
    updateStory: () => void;
}

const UploadForm: FC<IForm> = ({
    story,
    stories,
    handleCloseStoryModal,
    handleStoryChange,
    handleAddStories,
    updateStory,
}) => {
    let frameNumber = story.frame || stories.length + 1;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                story.key ? updateStory() : handleAddStories();
            }}
        >
            <h1 className="modalUpload__title">{story.type} Frame</h1>
            {story.type === "Text" ? (
                <UploadText
                    value={story.value}
                    handleStoryChange={handleStoryChange}
                    frameNumber={frameNumber}
                />
            ) : (
                <UploadImage
                    handleStoryChange={handleStoryChange}
                    frameNumber={frameNumber}
                    story={story}
                />
            )}
            <div className="modalUpload__btns">
                <Button
                    type="submit"
                    text={story.key ? "Update" : "Add"}
                    disabled={!story.value || !story.type}
                />
                <Button
                    type="button"
                    text="Cancel"
                    variant="no-border"
                    onClick={handleCloseStoryModal}
                />
            </div>
        </form>
    );
};

export default UploadForm;
