import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { Modal, ProtectRoute } from "../components";
import { StyledUploadPage } from "../components/Styles/StyledUploadPage";
import { Header, MetaHead, UploadForm } from "../modules/Upload";
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

        // create unique keys for stories
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
                <UploadForm
                    stories={stories}
                    story={story}
                    handleAddStories={handleAddStories}
                    handleCloseStoryModal={handleCloseStoryModal}
                    handleStoryChange={handleStoryChange}
                />
            </Modal>
        </>
    );
};

export default Upload;
// export default ProtectRoute(Upload);
