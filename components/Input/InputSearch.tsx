import { FC, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./../../components";
import { IInput } from "./Index";

type IInputSearch = Pick<
    IInput,
    "value" | "handleChange" | "placeholder" | "className"
>;

const InputSearch: FC<IInputSearch> = ({
    value,
    placeholder = "Search for stories, users...",
    handleChange,
    className = "",
}) => {
    className = `${className} form__input-search`;

    return (
        <Input
            type="search"
            value={value}
            name="search"
            id="search"
            placeholder={placeholder}
            Icon={
                <button className="form__input-icon" type="submit">
                    <FiSearch />
                </button>
            }
            handleChange={handleChange}
            others={{ "aria-label": "Search for stories, users..." }}
            className={className}
        />
    );
};

export default InputSearch;
