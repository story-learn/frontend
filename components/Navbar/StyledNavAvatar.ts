import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledNavAvatar = styled.div`
    position: relative;

    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .avatar {
        &__btn {
            background-color: var(--box-bg-2);
            font-size: 1.2em;
            font-weight: 500;

            &,
            & > * {
                border-radius: 50%;
            }

            & > * {
                width: 3rem;
                height: 3rem;
            }
        }

        &__img {
            overflow: hidden;
        }

        &__icon {
            padding: 0rem 0rem 0.4rem 0rem;
            text-align: center;
        }

        &__options {
            background-color: var(--box-bg-2);
            /* height: 100%; */
            border-radius: 1rem;
            /* padding-top: 1rem; */
            overflow: hidden;
            height: 0;
            opacity: 0;
            transition: all 0.25s ease-in-out;
            transform: translateY(2rem);
            /* box-shadow: 0 0.5rem 1rem var(--box-shadow-bg); */

            &--cont {
                position: fixed;
                top: 6.6rem;
                width: calc(100vw - 4rem);
                left: 2rem;
                right: 2rem;
                z-index: 900;
                overflow: hidden;
                border-radius: 1rem;

                &.open {
                    box-shadow: 0 0.3rem 0.1rem -0.3rem var(--box-border),
                        0 0.4rem 0.6rem -0.2rem var(--box-border),
                        0 0 0 0.1rem var(--box-border);

                    .avatar {
                        &__options {
                            height: 100%;
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                }
            }
        }

        &__option {
            justify-content: flex-start;

            &--link {
                width: 100%;
                padding-left: 1.2rem;
                margin: 1rem 0;
                color: var(--color-12);

                &:hover,
                &.active {
                    color: var(--primary-80);
                }
            }
        }

        &__logout {
            color: var(--primary-80);
            text-align: left;
            padding-left: 1.2rem;
            font-size: 1.5rem;
            background-color: coral;
            width: 100%;
            border-radius: 0;
            border-top: 0.1rem solid;
            padding-bottom: 1.8rem;

            &,
            &:hover {
                background-color: transparent;
            }
        }
    }

    @media screen and (${device.tablet}) {
        .avatar {
            &__options {
                &--cont {
                    max-width: 30rem;
                    top: 8rem;
                    left: auto;
                }
            }
        }
    }
`;
