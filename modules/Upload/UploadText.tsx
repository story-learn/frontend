import {
    ChangeEventHandler,
    ClipboardEventHandler,
    FC,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [textLength, setTextLength] = useState(value.length);
    const maxTextLength = 2_000; // maximum length of text user can input

    useEffect(() => {
        let textArea = textAreaRef.current!;

        // automatically focus textarea
        textArea.focus();
    }, []);

    const hanldeChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        let val = e.target.value;

        if (val.length >= maxTextLength) {
            val = val.slice(0, maxTextLength); // this takes care of pasting longer text
        }

        handleStoryChange(val);
        setTextLength(val.length);
    };

    return (
        <div className="modalUpload__control modalUpload__control-text">
            <label htmlFor="frame" className="modalUpload__label">
                Frame {frameNumber}
            </label>
            <textarea
                ref={textAreaRef}
                name="frame"
                id="frame"
                rows={10}
                placeholder="Write your text here"
                className="modalUpload__textarea"
                value={value}
                onChange={hanldeChange}
            ></textarea>
            <span className={`modalUpload__textarea-length`}>
                {textLength}/{maxTextLength}
            </span>
        </div>
    );
};

export default UploadText;
