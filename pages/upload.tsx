import { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal, Notification, ProtectRoute } from "../components";
import { StyledUploadPage } from "../components/Styles/StyledUploadPage";
import { useAuth } from "../context/AuthContext";
import useStoryRequest from "../Hooks/useStoryRequest";
import { Header, MetaHead, UploadForm, UploadPreview } from "../modules/Upload";
import { FrameType } from "../modules/Upload/Header";
import { createStory } from "../utilities/Story";

export type HandleStoryChange = (value: string) => void;

export interface Story {
    type: FrameType;
    value: string;
    key: string;
    frame?: number | null;
}

const Upload: NextPage = () => {
    let router = useRouter();
    const { authTokens } = useAuth();
    const { storyInstance } = useStoryRequest();
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

    const handleStoriesSubmitted: MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
        e.preventDefault();
        console.log("stories submitted....");

        try {
            await createStory(stories, storyInstance);

            toast.custom(
                <Notification
                    type="success"
                    shortText="Story successfully cretead! You'll be redirected to homepage in some seconds"
                />
            );

            setTimeout(() => {
                router.push("/");
            }, 5_000);
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        router.prefetch("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MetaHead />

            <StyledUploadPage>
                <Header
                    handleOpenStoryModal={handleOpenStoryModal}
                    handleStoriesSubmitted={handleStoriesSubmitted}
                    stories={stories}
                />

                {/* preview */}
                <UploadPreview
                    stories={stories}
                    deleteStory={deleteStory}
                    editStory={editStory}
                />
            </StyledUploadPage>

            <Modal
                showModal={openStoryModal}
                extraClassName="modalUpload"
                closeModal={handleCloseStoryModal}
                showCloseBtn={false}
            >
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

// export default Upload;
export default ProtectRoute(Upload);
