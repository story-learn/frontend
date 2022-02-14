import { ChangeEventHandler, FC, useEffect, useState } from "react";
import Image from "next/image";
import { GalleryIcon } from "../../components/SVGs";
import { HandleStoryChange } from "../../pages/upload";
import { StoryUpload as Story } from "../../interfaces";

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
    const [preview, setPreview] = useState("");

    useEffect(() => {
        // let file = story.value;

        // file is coimg from update if there is file
        // let previewSrc = file ? URL.createObjectURL(file as File) : "";
        // setPreview(previewSrc);

        let file = story.value;

        setPreview(story.value as string);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let image = e.target.files && e.target.files[0];
        if (!image) return null;

        // get preview string
        // let preview = URL.createObjectURL(image);
        // setPreview(preview);
        // handleStoryChange(image);

        let reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = function () {
            let preview = reader.result as string;
            let imageName = image!.name;

            let typeRegex = /^data:image\/\w+;base64,/;
            let base64 = preview.replace(typeRegex, "").trimStart();

            let imageVal = `${imageName}+${base64}`;

            setPreview(preview);
            handleStoryChange(preview, imageVal);
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
