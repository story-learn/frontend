import { ChangeEventHandler, FC } from "react";
import { EditPen } from "../SVGs";
import { StyledInputImage } from "./InputStyle";

interface IInputImageProps {
    handleFileChange: (preview: string, imageVal: string) => void;
    className?: string;
}

const InputImage: FC<IInputImageProps> = ({
    handleFileChange,
    className = "",
}) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let image = e.target.files && e.target.files[0];
        if (!image) return null;

        let reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = function () {
            let preview = reader.result as string;
            let imageName = image!.name;

            let typeRegex = /^data:image\/\w+;base64,/;
            let base64 = preview.replace(typeRegex, "").trimStart();

            let imageVal = `${imageName}+${base64}`;

            // console.log(imageVal);
            handleFileChange(preview, imageVal);
        };
    };

    return (
        <StyledInputImage className={`form__control form__file ${className}`}>
            <input
                type="file"
                accept="image/*"
                id="image"
                className="form__file--image"
                onChange={handleChange}
            />
            <label htmlFor="image" className="form__file--label">
                <span>
                    <EditPen />
                </span>
            </label>
        </StyledInputImage>
    );
};

export default InputImage;
