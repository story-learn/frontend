import styled from "styled-components";

export const StyledNavSearch = styled.form`
    margin-right: auto;
    margin-left: auto;
    position: relative;

    input {
        width: 100%;
        border-radius: var(--border-rad-xs);
        padding: 0.4rem 2.8rem 0.6rem 1.4rem;
        /* background-color: var(--input-bg-1); */
        background-color: var(--box-bg);
        font-size: 1.8rem;

        border: 0.1rem solid transparent;
        transition: all 0.2s linear;
        /* color: var(--stark-3); */
        color: var(--color-4);

        &:focus,
        &:hover {
            border-color: var(--primary-10);
        }
    }

    button {
        position: absolute;
        top: 1.8rem;
        right: 1rem;
        transform: translateY(-50%);
        font-size: 1.5rem;

        &:hover,
        &:focus {
            outline: none;
            border: none;
        }
    }
`;
