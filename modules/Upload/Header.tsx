import { FC, MouseEventHandler, useState } from "react";
import { UploadInstruction } from "./index";
import { Modal } from "../../components";
import { CameraIcon, HelpIcon, MarkIcon, PenIcon } from "../../components/SVGs";
import { StoryUpload as Story } from "../../interfaces";
import { FrameType } from "../../interfaces/types";

interface IHeader {
    handleOpenStoryModal: (type: FrameType) => void;
    handleStoriesSubmitted: MouseEventHandler<HTMLButtonElement>;
    stories: Story[];
}

const Header: FC<IHeader> = ({
    handleOpenStoryModal,
    handleStoriesSubmitted,
    stories,
}) => {
    const [openHelpModal, setOpenHelpModal] = useState(false);

    return (
        <>
            <header className="upload__header">
                <div className="container">
                    <div className="upload__header-cont">
                        <h1 className="upload__header-head">Upload Story</h1>
                        <button
                            className="upload__header-btn"
                            aria-label="upload story"
                            type="submit"
                            onClick={handleStoriesSubmitted}
                            disabled={stories.length < 2}
                        >
                            <span
                                className="upload__header-btn-icon"
                                aria-hidden="true"
                            >
                                <MarkIcon />
                            </span>
                            <span
                                className="upload__header-btn-text"
                                aria-hidden="true"
                            >
                                Upload
                            </span>
                        </button>
                        <button
                            className=" btn__icon upload__header-help"
                            onClick={() => {
                                setOpenHelpModal(true);
                            }}
                        >
                            <HelpIcon />
                        </button>
                    </div>
                    <UploadInstruction />

                    <div className="upload__btns">
                        <button
                            aria-label="show text frame"
                            className="btn__icon upload__btn upload__btn-text"
                            onClick={() => handleOpenStoryModal("Text")}
                        >
                            <PenIcon />
                        </button>
                        <button
                            aria-label="show image frame"
                            className="btn__icon upload__btn upload__btn-image"
                            onClick={() => handleOpenStoryModal("Image")}
                        >
                            <CameraIcon />
                        </button>
                    </div>
                </div>
            </header>

            <Modal
                showModal={openHelpModal}
                closeModal={() => {
                    setOpenHelpModal(false);
                }}
                showCloseBtn={false}
            >
                <UploadInstruction />
            </Modal>
        </>
    );
};

export default Header;
