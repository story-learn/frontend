import { createGlobalStyle } from "styled-components";

export const UtilityStyles = createGlobalStyle`
    .error {
        background: var(--error);

        &-border {
            &,
            &:hover,
            &:focus {
                border-color: var(--error);
            }
        }
    }

    .icon {
        color: var(--icon-1);
    }

    .btn {
        &__icon {
            display: inline-block;
            padding: 1rem;
            padding-bottom: 1.2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 4rem;
            height: 4rem;
            background-color: transparent;

            &:hover {
                background-color: var(--box-shadow-bg);
            }

            /* &-active {
                background-color: red;
            } */
        }
    }

    .container {
        padding-right: 2rem;
        padding-left: 2rem;
        width: 100%;
        inline-size: 100%;
        max-width: 120rem;
        max-inline-size: 120rem;
        margin-inline-start: auto;
        margin-inline-end: auto;
    }
`;
