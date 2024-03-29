import React, { Component, FocusEventHandler } from "react";
import { ChangeEventHandler, FC, useState } from "react";
import { Input } from "../../components";
import { IInput } from "./Index";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { HidePasswordIcon, ShowPasswordIcon } from "../SVGs";

type PasswordProps = Omit<IInput, "type" | "icon">;

const InputPassword: FC<PasswordProps> = ({
    id,
    label,
    name,
    value,
    error,
    placeholder,
    handleChange,
    handleBlur,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Input
            type={showPassword ? "text" : "password"}
            value={value}
            name={name}
            id={id}
            label={label}
            placeholder={placeholder}
            handleChange={handleChange}
            error={error}
            handleBlur={handleBlur}
            Icon={
                <button
                    type="button"
                    className="form__input-icon form__input-icon-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-hidden="true"
                >
                    {showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                </button>
            }
        />
    );
};

export default InputPassword;
