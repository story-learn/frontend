import { FC } from "react";
import { CameraIcon, PenIcon } from "../../components/SVGs";

export type FrameType = "" | "Text" | "Image";

interface IHeader {
    handleOpenStoryModal: (type: FrameType) => void;
}

const Header: FC<IHeader> = ({ handleOpenStoryModal }) => {
    return (
        <header className="upload__header">
            <div className="container">
                <h1 className="upload__header-head">Upload Story</h1>
                <p className="upload__header-para">
                    Click the pen icon to upload text. Click the camera icon to
                    upload image. Check the preview section to preview the
                    frames. Click upload to upload.
                </p>
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
    );
};

export default Header;
