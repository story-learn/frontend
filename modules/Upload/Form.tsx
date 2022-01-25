import { FC, FormEventHandler } from "react";
import { UploadText, UploadImage } from "./index";
import { HandleStoryChange, Story } from "../../pages/upload";
import { Button } from "../../components";

export interface IForm {
    story: Story;
    stories: Story[];
    handleAddStories: FormEventHandler<HTMLFormElement>;
    handleStoryChange: HandleStoryChange;
    handleCloseStoryModal: () => void;
}

const UploadForm: FC<IForm> = ({
    story,
    stories,
    handleCloseStoryModal,
    handleStoryChange,
    handleAddStories,
}) => {
    return (
        <form onSubmit={handleAddStories}>
            <h1 className="modalUpload__title">{story.type} Frame</h1>
            {story.type === "Text" ? (
                <UploadText
                    value={story.value}
                    handleStoryChange={handleStoryChange}
                    frameNumber={stories.length + 1}
                />
            ) : (
                <UploadImage
                    handleStoryChange={handleStoryChange}
                    frameNumber={stories.length + 1}
                />
            )}
            <div className="modalUpload__btns">
                <Button
                    type="submit"
                    text="Add"
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
