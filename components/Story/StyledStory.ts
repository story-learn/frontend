import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { IStory } from "./Story";

interface StyledStoryProps extends Pick<IStory, "user_liked_story"> {}

export const StyledStory = styled.li<StyledStoryProps>`
    width: 100%;
    border-bottom: 0.1rem solid var(--box-border);
    padding-bottom: 1.6rem;

    .story {
        &__link {
            color: inherit;
            display: block;
            width: 100%;
        }

        &__header {
            padding: 1rem 1.5rem;
            padding: 4rem 1.5rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > div {
                display: flex;
                align-items: flex-end;
            }

            &--data {
                .profile__username {
                    margin-right: 1rem;
                }
            }
        }

        &__posted {
            font-size: 1.4rem;
            opacity: 0.7;
            /* margin-left: -2rem; */
            /* margin-left: 1rem; */
        }

        &__main {
            text-align: center;
            font-size: 1.6rem;
            color: var(--color-4);
            padding: 2.5rem 2rem;
            padding: 0rem 2rem 0.4rem;

            &-text {
                display: -webkit-box;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 1.9;
                text-align: left;
            }

            &-img {
                width: 100%;
                max-height: 40rem;
                overflow: hidden;
                border-radius: var(--border-rad-sm);
            }
        }

        &__actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 1rem 2rem 0.7rem;

            &-bookmark,
            &-like,
            &-share {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 2rem;
                border-radius: var(--border-rad-lg);
                padding: 0.5rem 1rem;
                font-size: 1.2rem;

                svg {
                    margin-right: 0.5rem;
                }

                &:hover {
                    opacity: 0.5s;
                }
            }

            &-bookmark,
            &-share {
                background-color: var(--box-bg-2);
                border-radius: var(--border-rad-xl);
            }

            &-bookmark {
                background-color: transparent;
                font-size: 1.7rem;
                color: var(--color-6);
                margin-right: 0.4rem;
            }

            &-like {
                /* background-color: var(--primary); */
                color: ${({ user_liked_story }) =>
                    user_liked_story ? "var(--primary)" : "var(--general-fg)"};
            }

            &-share {
                margin-right: 0;
                padding: 0.9rem 1.2rem 1rem 1.6rem;
            }
        }
    }

    @media screen and (${device.tablet}) {
        max-width: 64rem;
        margin-right: auto;
        margin-left: auto;
        border: 0;
        margin-bottom: 4rem;

        .story {
            display: flex;
            align-items: flex-end;

            &__header {
                padding-bottom: 1.7rem;
                padding-top: 1rem;
                border-bottom: 0.1rem solid var(--box-border);
            }

            &__contents {
                background-color: var(--box-bg-2);
                border-radius: var(--border-rad-sm);
                padding: 1.4rem 1.2rem 1rem;
                width: 100%;
            }

            &__main {
                border: 0;
                padding: 2.5rem 2rem;

                &-text {
                    -webkit-line-clamp: 4;
                }
            }

            &__actions {
                flex-shrink: 0;
                width: max-content;
                flex-direction: column;
                padding: 0;
                align-items: center;
                justify-content: center;
                row-gap: 1.3rem;
                margin-left: 1rem;

                & > * {
                    margin: 0;
                }
            }
        }
    }
`;
