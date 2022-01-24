import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { Button, Modal, ProtectRoute } from "../components";
import { StyledUploadPage } from "../components/Styles/StyledUploadPage";
import { Header, MetaHead, UploadImage, UploadText } from "../modules/Upload";
import { FrameType } from "../modules/Upload/Header";

export type HandleStoryChange = (value: string) => void;

export interface Story {
    type: FrameType;
    value: string;
    key: string;
}

const Upload: NextPage = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [story, setStory] = useState<Story>({ type: "", value: "", key: "" });
    const [openStoryModal, setOpenStoryModal] = useState(false);

    const handleOpenStoryModal = (type: FrameType) => {
        setOpenStoryModal(true);
        setStory((prev) => ({ ...prev, type: type }));
    };

    const handleCloseStoryModal = () => {
        setOpenStoryModal(false);
        setStory({ type: "", value: "", key: "" });
    };

    const handleStoryChange: HandleStoryChange = (value) => {
        setStory((prev) => ({ ...prev, value }));
    };

    const handleAddStories: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!story.value || !story.type) return;

        let key = Date.now() as any as string;

        setStories((prev) => [...prev, { ...story, key }]);
        handleCloseStoryModal();
    };

    useEffect(() => {
        console.log({ stories });
    }, [stories]);

    return (
        <>
            <MetaHead />

            <StyledUploadPage>
                <Header handleOpenStoryModal={handleOpenStoryModal} />
            </StyledUploadPage>

            <Modal showModal={openStoryModal} extraClassName="modalUpload">
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
            </Modal>
        </>
    );
};

export default Upload;
// export default ProtectRoute(Upload);
