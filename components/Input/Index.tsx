import {
    ChangeEventHandler,
    FC,
    FocusEventHandler,
    HTMLAttributes,
    HTMLInputTypeAttribute,
    KeyboardEventHandler,
} from "react";
import InputStyle from "./InputStyle";
import { LoadingIndicator } from "./../../components";

export interface IInput {
    value: string | number;
    name: string;
    id: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    error?: string;
    processing?: boolean;
    Icon?: any;
    showError?: string;
    className?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    handleBlur?: FocusEventHandler<HTMLInputElement>;
    handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    others?: HTMLAttributes<HTMLInputElement>;
}

const Index: FC<IInput> = ({
    type = "text",
    value,
    name,
    id,
    placeholder,
    label,
    error,
    processing,
    Icon,
    showError,
    className = "",
    handleChange,
    handleBlur,
    handleKeyDown,
    others,
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
                className={`form__input ${errorClass} ${className}`}
                error={error}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="false"
                autoSave="false"
                onKeyDown={handleKeyDown}
                showError={showError}
                {...others}
            />
            {label && (
                <label htmlFor={id} className="form__label">
                    {label}
                </label>
            )}
            {Icon}
            {error && <span>{error}</span>}
        </div>
    );
};

export default Index;
