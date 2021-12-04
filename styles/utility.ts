import { createGlobalStyle } from "styled-components";

export const UtilityStyles = createGlobalStyle`
    .error {
        background: red;

        &-border {
            &,
            &:hover,
            &:focus {
                border-color: red;
            }
        }
    }

    .icon {
        color: var(--icon-1);
    }
`;
