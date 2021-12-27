import { createGlobalStyle } from "styled-components";

export const ElementStyles = createGlobalStyle`
    /* headings */
    h1 {
        font-size: 3.2rem;
        margin: 0.67em 0;
    }

    h2 {
        font-size: 2.4rem;
        margin: 0.75em 0;
    }

    h3 {
        font-size: 1.8rem;
        margin: 0.83em 0;
    }

    h5 {
        font-size: 1.3rem;
        margin: 1.5em 0;
    }

    h6 {
        font-size: 1rem;
        margin: 1.67em 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 700;
    }

    /* inputs */
    input {
        border: none;
    }

    /* remove default oulines from buttons and inputs */
    input:focus,
    button:focus {
        outline: none;
        border-style: solid;
    }

    a {
        text-decoration: none;
        font-size: 1.5rem;
        color: var(--primary);
    }

    button {
        border: none;
        cursor: pointer;
        background-color: transparent;

        &:disabled {
            background-color: red;
        }
    }

    button.form__input-icon {
        &:focus,
        &:hover,
        &:active {
            outline: none;
            border: none;
        }
    }
`;
