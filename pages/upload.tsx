import { NextPage } from "next";
import { useState } from "react";
import { Modal, ProtectRoute } from "../components";
import { StyledUploadPage } from "../components/Styles/StyledUploadPage";
import { Header, MetaHead, UploadForm, UploadPreview } from "../modules/Upload";
import { FrameType } from "../modules/Upload/Header";

export type HandleStoryChange = (value: string) => void;

export interface Story {
    type: FrameType;
    value: string;
    key: string;
    frame?: number | null;
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
        setStory({ type: "", value: "", key: "", frame: null });
    };

    const handleStoryChange: HandleStoryChange = (value) => {
        setStory((prev) => ({ ...prev, value }));
    };

    const handleAddStories = () => {
        if (!story.value || !story.type) return;

        // create unique keys for stories
        let key = Date.now() as any as string;

        setStories((prev) => [...prev, { ...story, key }]);
        handleCloseStoryModal();
    };

    const deleteStory = (id: Story["key"]) => {
        let newStories = [...stories].filter((story) => story.key !== id);

        setStories([...newStories]);
    };

    const editStory = (id: Story["key"]) => {
        let story = [...stories].find(({ key }) => key === id);

        if (!story) return;

        let frame = [...stories].findIndex(({ key }) => key === story!.key);
        // add 1 to index to show frame number
        frame = frame + 1;

        setOpenStoryModal(true);
        setStory({ ...story, frame });
    };

    const updateStory = () => {
        let newStory = { ...story };

        let newStories = [...stories].map((story) =>
            story.key === newStory.key ? newStory : story
        );

        setStories([...newStories]);
        handleCloseStoryModal();
    };

    return (
        <>
            <MetaHead />

            <StyledUploadPage>
                <Header handleOpenStoryModal={handleOpenStoryModal} />

                {/* preview */}
                <UploadPreview
                    stories={stories}
                    deleteStory={deleteStory}
                    editStory={editStory}
                />
            </StyledUploadPage>

            <Modal showModal={openStoryModal} extraClassName="modalUpload">
                <UploadForm
                    stories={stories}
                    story={story}
                    handleAddStories={handleAddStories}
                    handleCloseStoryModal={handleCloseStoryModal}
                    handleStoryChange={handleStoryChange}
                    updateStory={updateStory}
                />
            </Modal>
        </>
    );
};

export default Upload;
// export default ProtectRoute(Upload);
