import { FC } from "react";
import { HandleStoryChange } from "../../pages/upload";

interface IUploadText {
    value: string;
    handleStoryChange: HandleStoryChange;
    frameNumber: number;
}

const UploadText: FC<IUploadText> = ({
    value,
    frameNumber,
    handleStoryChange,
}) => {
    return (
        <div className="modalUpload__control">
            <label htmlFor="frame" className="modalUpload__label">
                Frame {frameNumber}
            </label>
            <textarea
                name="frame"
                id="frame"
                rows={10}
                placeholder="write your text here"
                className="modalUpload__textarea"
                value={value}
                onChange={(e) => {
                    let val = e.target.value;
                    handleStoryChange(val);
                }}
            ></textarea>
        </div>
    );
};

export default UploadText;
