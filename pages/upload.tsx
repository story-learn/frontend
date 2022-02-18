import { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    LoadingIndicator,
    Modal,
    Notification,
    ProtectRoute,
} from "../components";
import { StyledUploadPage } from "../components/Styles/StyledUploadPage";
import { useStories } from "../context/StoriesContext";
import useStoryRequest from "../Hooks/useStoryRequest";
import { FrameUpload as Frame } from "../interfaces";
import { FrameType } from "../interfaces/types";
import { Header, MetaHead, UploadForm, UploadPreview } from "../modules/Upload";
import { createStory } from "../utilities/Story";

export type HandleFrameChange = (
    value: string | File,
    imageVal?: string
) => void;

interface Uploading {
    loading: boolean;
    error: string | null;
}

const Upload: NextPage = () => {
    let { dispatchStories } = useStories();
    let router = useRouter();
    const { storyInstance } = useStoryRequest();
    const [frames, setFrames] = useState<Frame[]>([]);
    const [frame, setFrame] = useState<Frame>({
        type: "",
        value: "",
        key: "",
        imageVal: "",
    });
    const [openStoryModal, setOpenStoryModal] = useState(false);
    const [uploading, setUploading] = useState<Uploading>({
        loading: false,
        error: null,
    });

    const handleOpenStoryModal = (type: FrameType) => {
        setOpenStoryModal(true);
        setFrame((prev) => ({ ...prev, type: type }));
    };

    const handleCloseStoryModal = () => {
        setOpenStoryModal(false);
        setFrame({ type: "", value: "", key: "", index: null });
    };

    const handleFrameChange: HandleFrameChange = (value, imageVal = "") => {
        setFrame((prev) => ({ ...prev, value, imageVal }));
    };

    const handleSwitchFrame = (type: FrameType) => {
        setFrame({ key: "", type, value: "" });
    };

    const handleAddFrame = () => {
        if (!frame.value || !frame.type) return;

        // create unique keys for stories
        let key = Date.now() as any as string;

        setFrames((prev) => [...prev, { ...frame, key }]);
        handleCloseStoryModal();
    };

    const deleteFrame = (id: Frame["key"]) => {
        let newFrame = [...frames].filter((frame) => frame.key !== id);

        setFrames([...newFrame]);
    };

    const editFrame = (id: Frame["key"]) => {
        // get the frame
        let frame = [...frames].find(({ key }) => key === id);

        if (!frame) return;

        // get its index
        let index = [...frames].findIndex(({ key }) => key === frame!.key);

        // add 1 to index to show frame number
        index = index + 1;

        setOpenStoryModal(true);
        setFrame({ ...frame, index });
    };

    const updateFrame = () => {
        let newFrame = { ...frame };

        let newFrames = [...frames].map((frame) =>
            frame.key === newFrame.key ? newFrame : frame
        );

        setFrames([...newFrames]);
        handleCloseStoryModal();
    };

    const handleCreateStory: MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
        e.preventDefault();

        try {
            setUploading((prev) => ({ ...prev, loading: true }));
            let newStory = await createStory(frames, storyInstance);

            newStory = {
                created: "2022-01-19T13:27:11.286232Z",
                frames: {
                    id: Date.now(),
                    image: null,
                    text: "Fake Data",
                    created: `${Date.now()}`,
                    story: 1,
                },
                id: Date.now(),
                user: {
                    username: "Chinedu",
                    first_name: "",
                    last_name: "",
                    email: "emekaaladimma@gmail.com",
                },
            };

            // update global stories
            dispatchStories({ type: "upload_new_story", payload: newStory });

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
            console.log(error);
            setUploading((prev) => ({
                ...prev,
                loading: false,
                error: "There is an error",
            }));
        }
    };

    useEffect(() => {
        // prefetch home page since user will be redirected to home page after story is created
        router.prefetch("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let disableUploadBtn = frames.length < 2;

    return (
        <>
            <MetaHead />

            <StyledUploadPage>
                <Header
                    handleOpenStoryModal={handleOpenStoryModal}
                    handleCreateStory={handleCreateStory}
                    disbaled={disableUploadBtn}
                />

                {/* preview */}
                <UploadPreview
                    frames={frames}
                    deleteFrame={deleteFrame}
                    editFrame={editFrame}
                />
            </StyledUploadPage>

            <Modal
                showModal={openStoryModal}
                extraClassName="modalUpload"
                closeModal={handleCloseStoryModal}
                showCloseBtn={false}
            >
                <UploadForm
                    frames={frames}
                    frame={frame}
                    handleAddFrame={handleAddFrame}
                    handleCloseStoryModal={handleCloseStoryModal}
                    handleFrameChange={handleFrameChange}
                    updateFrame={updateFrame}
                    handleSwitchFrame={handleSwitchFrame}
                />
            </Modal>

            {/* show a loading indicator when a user uploads a story */}
            <Modal showModal={uploading.loading}>
                <LoadingIndicator />
            </Modal>
        </>
    );
};

// export default Upload;
export default ProtectRoute(Upload);
