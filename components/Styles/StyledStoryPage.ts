import styled from "styled-components";
import { device } from "../../styles/breakpoints";

// please, don't tourch the styles here unless you're 150% sure of what you're applying😔
export const StyledStoryPage = styled.main`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .story {
        &__container {
            padding: 2rem 2.4rem 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            max-width: 59rem;
            overflow-y: initial !important;
            width: 100%;
        }

        &__close {
            color: var(--color-9);
            z-index: 55;
            display: none;
        }

        &__type {
            margin-top: auto;
            margin-bottom: auto;
            padding: 2rem 0rem;

            &-text {
            }

            &-image {
                width: 100%;
                overflow: hidden;
            }
        }
    }

    .carousel {
        overflow: hidden;
        width: 100%;

        &__inner {
            transition: transform 0.25s ease-in-out;
            display: flex;
        }

        &__items {
            width: 100%;
            flex-shrink: 0;
            opacity: 0;
            overflow-y: auto;
            max-height: 80vh;
            margin-top: auto;
            margin-bottom: auto;

            &.active {
                opacity: 1;
            }
        }

        &__controls {
            z-index: 50;
            background-color: var(--box-border);
            color: var(--color-4);
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            height: 100vh;
            top: 11rem;
            bottom: 0;
            width: 45vw;
            opacity: 0;
            cursor: auto;

            &--prev {
                left: 0.5rem;
            }

            &--next {
                right: 0.5rem;
            }
        }
    }

    @media screen and (${device.tablet}) {
        padding: 9.8rem 5.3rem;

        .story {
            &__container {
                background-color: var(--box-bg-2);
                position: relative;
                border-radius: var(--border-rad-sm);
                padding-left: 0;
                padding-right: 0;
                width: auto;
                min-width: 41.4rem;

                & > * {
                    max-width: 41.4rem;
                }
            }

            &__close {
                display: block;
                position: absolute;
                top: 1rem;
                right: -3rem;
            }
        }

        .carousel {
            &__items {
                padding-right: 2.4rem;
                padding-left: 2.4rem;
            }

            &__controls {
                opacity: 1;
                position: absolute;
                height: 3rem;
                width: 3rem;
                border-radius: 50%;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;

                &--prev {
                    left: -4rem;
                }

                &--next {
                    right: -4rem;
                }
            }
        }
    }
`;

interface IStyledStoryIndicator {
    numberOfIndicators: number;
}

const indicatorsWidth = (numberOfIndicators: number) =>
    `${100 / numberOfIndicators}%`;

export const StyledStoryIndicator = styled.header<IStyledStoryIndicator>`
    margin-bottom: 1.053rem;
    width: 100%;

    .story {
        &__header {
            &-share {
                display: block;
                margin: 1rem 0 0 auto;
                width: 3rem;
                height: 3rem;
                font-size: 3rem;
            }
        }

        &__indicators {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            &-item {
                height: 0.2rem;
                min-width: 0.01rem;
                width: ${({ numberOfIndicators = 1 }) =>
                    indicatorsWidth(numberOfIndicators)};
                background-color: var(--color-8);
                margin-right: 0.45rem;
                border-radius: var(--border-rad-xxs);
                transition: all 0.2s linear;

                &.active {
                    background-color: var(--color-7);
                }
            }
        }
    }

    @media screen and (${device.tablet}) {
        padding-right: 2.4rem;
        padding-left: 2.4rem;
    }
`;
