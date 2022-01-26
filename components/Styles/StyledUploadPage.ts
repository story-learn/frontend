import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledUploadPage = styled.main`
    .upload {
        &__header {
            /* box-shadow: 0px 1px 1px var(--color-3); */
            border-bottom: 0.1rem solid var(--color-3);
            padding-bottom: 3.5rem;

            &-head,
            &-para {
                text-align: center;
                max-width: 72rem;
                margin-right: auto;
                margin-left: auto;
                padding-right: 2rem;
                padding-left: 2rem;
            }

            &-head {
                font-size: 2.8rem;
            }

            &-para {
                color: var(--color-4);
                font-size: 1.8rem;
            }

            &-btn {
                background-color: var(--primary);
                border-radius: 50%;
                width: 4rem;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-col-1);
                position: fixed;
                bottom: 1.55rem;
                right: 2rem;
                z-index: 500;

                &-icon {
                }

                &-text {
                    display: none;
                }
            }

            &-help {
                display: none;
            }
        }

        &__btns {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 3rem;
        }

        &__btn {
            background-color: #f0f0f0;

            &-text {
                margin-right: 3rem;
            }

            &-image {
                color: var(--primary);
            }
        }
    }

    .preview {
        margin-top: 3rem;
        height: 0;
        width: 0;
        overflow: hidden;
        transition: all 0.3s linear;
        padding-bottom: 10rem;

        &.show {
            height: 100%;
            width: 100%;
        }

        &__head {
            padding-right: 1rem;
            padding-left: 1rem;
            text-align: center;
        }
    }

    .slider {
        padding-left: 2rem;
        padding-right: 2rem;

        &__item {
            border-radius: var(--border-rad-xs);
            overflow: hidden;

            &-frame {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.5rem;
                color: var(--color-5);
            }

            &-number {
                font-size: 1.6rem;
                font-weight: 300;
                margin: 0;
            }

            &-delete {
                display: block;
                width: max-content;
            }

            &-cont {
                border-radius: var(--border-rad-xs);
                background-color: var(--box-bg);
                /* background-color: red; */
                padding: 2rem;
                height: 100%;
                overflow: hidden;
                cursor: pointer;
            }

            &-content {
                font-size: 1.3rem;
                display: -webkit-box;
                -webkit-line-clamp: 15;
                -webkit-box-orient: vertical;
                overflow: hidden;
                height: 100%;
                color: var(--color-4);
            }

            &-img {
                border-radius: var(--border-rad-xs);
                background-color: red;
                overflow: hidden;
            }
        }

        .splide {
            &__arrow {
                align-items: center;
                width: 3.2rem;
                height: 3.2rem;

                svg {
                    width: 1rem;
                }

                &:disabled {
                    display: none;
                }

                &--prev {
                    left: -1.5rem;
                }

                &--next {
                    right: -1.5rem;
                }
            }
        }
    }

    @media screen and (${device.tablet}) {
        .upload {
            &__header {
                &-cont {
                    display: flex;
                    align-items: center;
                    /* justify-content: center; */
                }

                &-btn {
                    position: static;
                    width: auto;
                    height: auto;
                    border-radius: var(--border-rad-xs);
                    padding: 0.4rem 2.5rem 0.6rem;
                    font-size: 1.6rem;

                    &-icon {
                        display: none;
                    }

                    &-text {
                        display: block;
                    }
                }

                &-help {
                    display: block;

                    &:hover {
                        background-color: transparent;
                    }
                }
            }
        }
    }

    @media screen and (${device.laptopL}) {
        .slider {
            .splide {
                &__arrow {
                    &--prev {
                        left: -3rem;
                    }

                    &--next {
                        right: -3rem;
                    }
                }
            }
        }
    }
`;
