import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { StyledProfile } from "../Styles/StyledProfile";

export const StyledAccount = styled.li`
    &:not(:first-child) {
        .profile {
            &__link {
                padding-top: 3rem;
            }
        }
    }

    .profile {
        &__link {
            display: block;
            width: 100%;
            height: 100%;

            box-shadow: 0px 1px 1px var(--box-border);
            padding: 0 2rem 2.5rem;
        }

        &__name {
            color: var(--color-10);
        }

        &__userFollow {
            color: var(--color-4);
        }

        &__bio {
            color: var(--color-11);
            margin-top: 0.8rem;
            font-weight: 500;
        }
    }

    @media screen and (${device.tablet}) {
        max-width: 64rem;

        .profile {
            &__link {
                box-shadow: none;
                background-color: var(--box-bg-2);
                border-radius: var(--border-rad-sm);
                padding: 2.6rem 3.2rem;
                margin-bottom: 4rem;
            }
        }
    }
`;
