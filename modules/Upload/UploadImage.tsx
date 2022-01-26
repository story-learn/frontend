import { ChangeEventHandler, FC, useState } from "react";
import Image from "next/image";
import { GalleryIcon } from "../../components/SVGs";
import { HandleStoryChange, Story } from "../../pages/upload";

interface IUploadImage {
    handleStoryChange: HandleStoryChange;
    frameNumber: number;
    story: Story;
}

const UploadImage: FC<IUploadImage> = ({
    frameNumber,
    story,
    handleStoryChange,
}) => {
    const [preview, setPreview] = useState(story.value || "");

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let image = e.target.files && e.target.files[0];
        if (!image) return null;

        let reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = () => {
            let story = reader.result as unknown as string;
            setPreview(story);
            handleStoryChange(story);
        };
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
                            objectFit="cover"
                        />
                    )}
                </figure>
            </output>
        </div>
    );
};

export default UploadImage;
