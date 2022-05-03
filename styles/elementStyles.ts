import { createGlobalStyle } from "styled-components";

export const ElementStyles = createGlobalStyle`
    /* custom scrollbar for firefox */
    html {
        scrollbar-width: thin;
        scrollbar-color: var(--primary) var(--secondary-20);
    }

    /* custom scrollbar for other browsers */
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar,
    ::-webkit-scrollbar-thumb {
        border-radius: 1rem;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px var(--secondary-80);
        background-color: var(--disabled-fg);

        &:hover {
            background-color: var(--secondary-20);
        }
    }

    ::-webkit-scrollbar {
        width: 1rem;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--primary);	
        background-image: -webkit-linear-gradient(90deg,
            rgba(255, 255, 255, .2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, .2) 50%,
            rgba(255, 255, 255, .2) 75%,
            transparent 75%,
            transparent
        );
    }

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
        border: 0.1rem solid transparent;
        cursor: pointer;
        background-color: transparent;

        &:disabled {
            background-color: red;
        }
    }

    a,
    button {
        transition: all 0.2s ease-in;
    }

    button.form__input-icon {
        &:focus,
        &:hover,
        &:active {
            outline: none;
            border: none;
        }

        &:disabled {
            cursor:not-allowed !important;
            background-color: var(--disabled) !important;
            color: var(--disabled-fg) !important;
        }
    }

`;
