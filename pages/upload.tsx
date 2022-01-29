import { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal, Notification, ProtectRoute } from "../components";
import { StyledUploadPage } from "../components/Styles/StyledUploadPage";
import useStoryRequest from "../Hooks/useStoryRequest";
import { StoryUpload as Story } from "../interfaces";
import { FrameType } from "../interfaces/types";
import { Header, MetaHead, UploadForm, UploadPreview } from "../modules/Upload";
import { createStory } from "../utilities/Story";

export type HandleStoryChange = (value: string | File) => void;

const Upload: NextPage = () => {
    let router = useRouter();
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

            // notify user
            setTimeout(() => {
                toast.custom(
                    <Notification
                        type="success"
                        shortText="Story successfully cretead!"
                    />
                );
            }, 600);

            router.push("/");
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        // prefetch home page since user will be redirected to home page after story is created
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
