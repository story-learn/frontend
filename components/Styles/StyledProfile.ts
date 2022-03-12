import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledProfile = styled.div`
    display: flex;
    align-items: flex-start;

    &.profile {
        box-shadow: 0px 1px 1px var(--box-border);
        /* border-bottom: 0.1rem solid var(--box-border); */
        padding: 0 2rem 2.5rem;

        &:not(:first-child) {
            padding-top: 3rem;
        }
    }

    figure {
        margin-right: 1rem;
    }

    .profile {
        &__avatar,
        &__follow {
            flex-shrink: 0;
        }

        &__avatar {
        }

        &__detail {
            margin-right: 1rem;
        }

        &__name {
            font-weight: bolder;
            font-size: 1.8rem;
        }

        &__userFollow {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: -0.5rem;
            font-size: 1.4rem;
            opacity: 0.7;
        }

        &__username {
        }

        &__followers {
            position: relative;
            margin-left: 0.7rem;
            padding-left: 0.7rem;
            font-size: 1.2rem;
            padding-top: 0.4rem;

            &:before {
                position: absolute;
                content: "";
                display: inline-block;
                top: 1.35rem;
                left: 0;
                transform: translate(-50%, -50%);
                width: 0.3rem;
                height: 0.3rem;
                border-radius: 50%;
                background-color: var(--color-6);
                opacity: 1;
            }
        }

        &__bio {
            font-size: 1.4rem;
            color: var(--color-4);
            max-width: 35rem;
        }

        &__follow {
            font-size: 1.2rem;
            font-weight: 500;
            flex-shrink: 0;
            padding: 0.85rem 1.4rem;
            align-self: center;
            margin-left: auto;
        }
    }

    @media screen and (${device.tablet}) {
        &.profile {
            box-shadow: none;
            background-color: var(--box-bg-2);
            border-radius: var(--border-rad-sm);
            padding: 2.6rem 3.2rem;
            margin-bottom: 4rem;
        }
    }
`;
