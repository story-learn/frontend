import { ChangeEventHandler, FC, useState } from "react";
import Image from "next/image";
import { GalleryIcon } from "../../components/SVGs";
import { HandleStoryChange } from "../../pages/upload";

interface IUploadImage {
    handleStoryChange: HandleStoryChange;
    frameNumber: number;
}

const UploadImage: FC<IUploadImage> = ({ frameNumber, handleStoryChange }) => {
    const [preview, setPreview] = useState("");

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let image = e.target.files && e.target.files[0];
        if (!image) return null;

        let story = URL.createObjectURL(image);
        setPreview(story);
        handleStoryChange(story);
    };

    return (
        <div className="modalUpload__control">
            <p>Frame {frameNumber}</p>
            <input
                type="file"
                id="frame"
                name="frame"
                accept="image/*"
                className="modalUpload__file-input"
                onChange={handleFileChange}
            />
            <label htmlFor="frame" className="modalUpload__file-label">
                <span aria-hidden={true}>
                    <GalleryIcon />
                </span>{" "}
                Click to {preview ? "change" : "choose an"} image
            </label>
            <output
                className={`modalUpload__file-output ${preview ? "show" : ""}`}
            >
                <figure>
                    {preview && (
                        <Image
                            src={preview}
                            alt=""
                            lang=""
                            width={300}
                            height={300}
                            layout="responsive"
                        />
                    )}
                </figure>
            </output>
        </div>
    );
};

export default UploadImage;
