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
