import styled from "styled-components";
import { ButtonProps } from "./Index";

type IStyle = Pick<ButtonProps, "processing" | "variant">;

export const StyledButton = styled.button<IStyle>`
    display: inline-block;
    width: max-content;
    padding: 1.3rem 8.5rem;
    border-radius: var(--border-rad-xs);
    cursor: ${({ processing }) => (processing ? "not-allowed" : "pointer")};
    text-transform: capitalize;
    transition: all 0.2s linear;

    background-color: ${({ variant }) =>
        variant === "outline" ? "transparent" : "var(--primary)"};
    /* color: ${({ variant }) =>
        variant === "outline" ? "var(--primary)" : "var(--stark)"}; */
    color: ${({ variant }) =>
        variant === "outline" ? "var(--primary)" : "var(--stark-2)"};

    border: ${({ variant }) =>
        variant === "outline" ? "0.1rem solid" : "none"};
    font-weight: 600;

    &:hover {
        cursor: pointer;
        background-color: ${({ variant }) =>
            variant === "outline" ? "transparent" : "var(--primary-80)"};
    }

    &:disabled {
        background-color: var(--disabled-bg);
        color: var(--disbaled-fg);
        cursor: not-allowed;
    }
`;
