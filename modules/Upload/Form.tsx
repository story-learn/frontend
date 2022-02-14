import { FC, MouseEventHandler } from "react";
import { UploadText, UploadImage } from "./index";
import { HandleFrameChange } from "../../pages/upload";
import { Button } from "../../components";
import { FrameUpload } from "../../interfaces";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { FrameType } from "../../interfaces/types";

export interface IForm {
    frame: FrameUpload;
    frames: FrameUpload[];
    handleAddFrame: () => void;
    handleFrameChange: HandleFrameChange;
    handleCloseStoryModal: () => void;
    updateFrame: () => void;
    handleSwitchFrame: (type: FrameType) => void;
}

const UploadForm: FC<IForm> = ({
    frame,
    frames,
    handleCloseStoryModal,
    handleFrameChange,
    handleAddFrame,
    updateFrame,
    handleSwitchFrame,
}) => {
    let frameNumber = frame.index || frames.length + 1;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                frame.key ? updateFrame() : handleAddFrame();
            }}
        >
            <header className="modalUpload__header">
                <h1 className="modalUpload__title">{frame.type} Frame</h1>
                <button
                    className="modalUpload__switch"
                    onClick={() =>
                        handleSwitchFrame(
                            frame.type === "Image" ? "Text" : "Image"
                        )
                    }
                >
                    <HiOutlineSwitchHorizontal />
                </button>
            </header>
            {frame.type === "Text" ? (
                <UploadText
                    value={frame.value as string}
                    handleFrameChange={handleFrameChange}
                    frameNumber={frameNumber}
                    handleAddFrame={handleAddFrame}
                />
            ) : (
                <UploadImage
                    handleFrameChange={handleFrameChange}
                    frameNumber={frameNumber}
                    frame={frame}
                />
            )}
            <div className="modalUpload__btns">
                <Button
                    type="submit"
                    text={frame.key ? "Update" : "Add"}
                    disabled={!frame.value || !frame.type}
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
