import styled from "styled-components";

export const StyledProfile = styled.div`
    display: flex;
    align-items: flex-start;

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

            &:hover {
                opacity: 0.7;
            }
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
`;
