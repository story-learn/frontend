import styled from "styled-components";
import { IInput as InputProps } from "./Index";

type StyleProp = Pick<InputProps, "error" | "showError">;

const InputStyle = styled.input<StyleProp>`
    width: 100%;
    display: block;
    border-radius: var(--border-rad-xs);
    padding: 1.5rem 1.6rem 1.3rem;
    background-color: var(--input-bg-1);
    height: 5.2rem;
    font-size: 1.4rem;

    border: 0.1rem solid transparent;
    transition: all 0.2s linear;
    color: var(--stark-3);

    &:focus,
    &:hover {
        border-color: var(--primary-10);
    }

    &:-webkit-autofill {
        box-shadow: 0 0 0 30px var(--input-bg-1) inset !important;
        -webkit-text-fill-color: var(--stark-3);
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

    &:placeholder-shown {
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
