import styled from "styled-components";
import { IInput as InputProps } from "./Index";

type StyleProp = Pick<InputProps, "error" | "showError">;

const InputStyle = styled.input<StyleProp>`
    width: 100%;
    display: block;
    border-radius: var(--border-rad-xs);
    padding: 1.5rem 1.6rem 1.3rem;
    height: 5.2rem;
    font-size: 1.4rem;

    border: 0.1rem solid transparent;
    transition: all 0.2s linear;
    background-color: var(--box-bg);
    caret-color: var(--primary);

    &[type="search"] {
        &::-webkit-search-cancel-button {
            display: none;
        }

        & ~ button {
            border: 0;
            cursor: auto;
        }
    }

    &:focus,
    &:hover {
        border-color: var(--primary-10);
    }

    &:-webkit-autofill {
        box-shadow: 0 0 0 30px var(--box-bg) inset !important;
        -webkit-text-fill-color: var(--color-4);
        border: inherit;
        background: inherit;
    }

    & + label {
        font-size: 0.9rem;
        position: absolute;
        left: 1.7rem;
        transform: translateY(-50%);
        transition: all 0.3s ease-in-out;
        top: 1.2rem;
        font-weight: 500;
    }

    /* &:placeholder-shown { */
    &:not([type="search"]):placeholder-shown {
        padding: 1.4rem 1.6rem;
        & + label {
            font-size: 1.4rem;
            opacity: 0;
            color: blue;
            top: 2.6rem;
            transition: all 0.15s ease-in-out;
        }
    }

    & ~ span {
        display: block;
        width: 100%;
        color: red;
        font-size: 1.2rem;
        line-height: 1.2;
        margin-top: 0.3rem;
        color: var(--error);
    }
`;

export default InputStyle;

export const StyledRadio = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border: 0.1rem solid var(--primary);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    margin-right: 0.5rem;
    margin-top: 0.2rem;

    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 48%;
        left: 48%;
        transform: translate(-50%, -50%) scale(0);
        /* transform: translate(-50%, -50%); */
        width: 50%;
        height: 50%;
        border-radius: 50%;
        background-color: var(--primary);
        transition: all 0.2s linear;
    }

    &:focus,
    &:hover {
        &::after {
            transform: translate(-50%, -50%) scale(0.5);
        }
    }

    &:checked {
        &::after {
            transform: translate(-46%, -49%) scale(1);
        }

        &:hover {
            &::after {
                background-color: var(--secondary);
            }
        }
    }

    & + label {
        font-size: 1.4rem;
        transition: all 0.3s ease-in-out;
        font-weight: 500;
    }

    &:disabled {
        &,
        & + label {
            cursor: not-allowed;
        }

        &::after {
            background-color: var(--disabled);
            opacity: 0;
        }

        &:checked {
            &::after {
                background-color: var(--disabled);
                opacity: 1;
            }
        }
    }
`;

export const StyledInputImage = styled.div`
    input {
        width: 0.01rem;
        height: 0.01rem;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;

        &:focus + label {
            border-color: var(--primary-80);
        }
    }

    label {
        background-color: var(--general-bg);
        border-radius: 50%;
        padding: 1.2rem;
        border: 0.15rem solid var(--box-border);
        cursor: pointer;

        &:hover {
            border-color: var(--primary-80);
        }

        & > * {
            pointer-events: none;
        }
    }
`;
