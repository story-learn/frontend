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
`;
