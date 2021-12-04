import {
    ChangeEventHandler,
    FC,
    FocusEventHandler,
    KeyboardEventHandler,
} from "react";
import InputStyle from "./InputStyle";
import { LoadingIndicator } from "./../../components";

export interface IInput {
    value: string | number;
    name: string;
    id: string;
    label: string;
    type?: string | "text";
    placeholder?: string;
    error?: string;
    processing?: boolean;
    Icon?: any;
    showError?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    handleBlur?: FocusEventHandler<HTMLInputElement>;
    handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const Index: FC<IInput> = ({
    type,
    value,
    name,
    id,
    placeholder,
    label,
    error,
    processing,
    Icon,
    showError,
    handleChange,
    handleBlur,
    handleKeyDown,
}) => {
    let errorClass = showError === "invalid" ? "error-border" : "";

    return (
        <div className="form__control">
            <InputStyle
                type={type}
                value={value}
                name={name}
                id={id}
                placeholder={placeholder}
                className={`form__input ${errorClass}`}
                error={error}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="false"
                autoSave="false"
                onKeyDown={handleKeyDown}
                showError={showError}
            />
            <label htmlFor={id} className="form__label">
                {label}
            </label>
            {Icon}
            {error && <span>{error}</span>}
            {/* {processing && (
                <LoadingIndicator className="form__input-processing" />
            )} */}
        </div>
    );
};

export default Index;
