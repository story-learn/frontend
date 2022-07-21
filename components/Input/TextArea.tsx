/* eslint-disable react-hooks/exhaustive-deps */
import {
    ChangeEventHandler,
    FC,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
import { IInput } from "./Index";
import { StyledTextArea } from "./TextareaStyle";

export interface ITextArea
    extends Pick<
        IInput,
        | "name"
        | "id"
        | "value"
        | "label"
        | "placeholder"
        | "error"
        | "className"
    > {
    maxLength: number;
    rows?: number;
    autoFocus?: boolean;
    onChange: (val: string) => void;
    onKeyDown: () => void;
}

const TextArea: FC<ITextArea> = ({
    id,
    value = "",
    name,
    error,
    label,
    placeholder,
    rows = 10,
    className = "",
    autoFocus,
    maxLength,
    onChange,
    onKeyDown,
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [textLength, setTextLength] = useState(`${value}`.length);
    const maxTextLength = maxLength; // maximum length of text user can input

    useEffect(() => {
        let textArea = textAreaRef.current!;

        // automatically focus textarea
        if (autoFocus) textArea.focus();
    }, []);

    const hanldeChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        let val = e.target.value;

        if (val.length >= maxTextLength) {
            val = val.slice(0, maxTextLength); // this takes care of pasting longer text
        }

        onChange(val);
        setTextLength(val.length);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.keyCode === 13 && e.shiftKey) {
            let text = textAreaRef.current?.value.trim();

            // submit the form if user has someting typed
            if (text) onKeyDown();
        }
    };

    return (
        <StyledTextArea className="form__control">
            <label htmlFor={id} className="form__textarea--label">
                {label}
            </label>
            <textarea
                ref={textAreaRef}
                name={name}
                id={id}
                rows={rows}
                placeholder={placeholder}
                className={`${className} form__textarea`}
                value={value}
                onChange={hanldeChange}
                onKeyDown={handleKeyDown}
            />
            <span className={`form__textarea--length`}>
                {textLength}/{maxTextLength}
            </span>
        </StyledTextArea>
    );
};

export default TextArea;
