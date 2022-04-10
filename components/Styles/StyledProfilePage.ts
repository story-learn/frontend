import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledProfilePage = styled.main`
    padding-top: 1.6rem;
    padding-bottom: 7rem;

    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile {
        &__header,
        &__tabs--cont {
            padding-left: 3.2rem;
            padding-right: 3.2rem;
        }

        &__header {
            flex-direction: column;
            text-align: center;
            /* background-color: green; */

            &--div {
                &-1 {
                    /* display: block; */
                    flex-direction: column;
                }

                &-2 {
                    margin-top: 2.4rem;
                    margin-bottom: 2.4rem;
                }
            }

            &--avatar {
                width: 100%;
                max-width: 12.8rem;
                max-height: 12.8rem;
                border-radius: 50%;
                flex: 0 0 auto;

                img {
                    border-radius: 50%;
                }
            }

            &--name {
                margin: 0rem;
                font-size: clamp(2rem, calc(1.4em + 2vw), 2.4rem);
            }

            &--username {
                margin-top: -0.6rem;
                font-size: clamp(1.3rem, calc(0.5em + 1vw), 1.6rem);
                color: var(--color-12);
            }

            &--follow {
                padding: 1rem clamp(4rem, calc(0.5em + 1vw), 6.4rem);
                font-size: clamp(1.3rem, calc(0.5em + 1vw), 1.6rem);
                margin-top: 2.8rem;
            }

            &--bio {
                font-size: clamp(1.4rem, calc(0.5em + 1vw), 1.6rem);
                color: var(--color-11);
                max-width: 35rem;
            }
        }

        &__tabs {
            &--cont {
                margin-top: 2rem;
                padding-top: 2rem;
                padding-bottom: 2rem;
                background-color: inherit;
                background-color: var(--general-bg);
                position: sticky;
                top: 0;
                z-index: 99;
            }

            align-items: stretch;
            justify-content: flex-start;
            overflow-x: auto;
            white-space: nowrap;

            /* Hide scrollbar for IE, Edge and Firefox */
            -ms-overflow-style: none;
            scrollbar-width: none;

            /* Hide scrollbar for Chrome, Safari and Opera */
            &::-webkit-scrollbar {
                display: none;
            }
        }

        &__tab {
            &:not(:last-child) {
                margin-right: 2rem;
            }

            &--btn {
                padding: 1.4rem 3.7rem 1.4rem 3.7rem;
                padding: 1rem 3.7rem 1.1rem;
                background-color: transparent;
                color: var(--color-11);
                font-size: 1.6rem;
                font-weight: 600;
                height: 100%;

                &:focus,
                &:hover {
                    border-color: var(--primary-20);
                }

                &-active {
                    background-color: var(--color-1);
                    box-shadow: 0px 0.1rem 0.1rem rgba(0, 0, 0, 0.12);

                    &:hover {
                        border-color: transparent;
                    }
                }
            }

            &--val {
                margin-left: 1.5rem;
                display: inline-flex;
                font-size: 1.4rem;
                width: 3.2rem;
                height: 3.2rem;
                padding: 0.7rem 0.8rem;
                flex: 0 0 auto;
                color: var(--primary);
                background-color: var(--primary-20);
                font-weight: 600;
                border-radius: 50%;
            }
        }

        &__main {
            &--section {
                display: block;

                & > section {
                    width: 100%;
                }
            }
        }

        &__stories {
            &--other {
                padding: 0 3.2rem;

                &--no {
                }

                &--error {
                    color: #e22;
                }
            }
        }
    }

    @media screen and (${device.tablet}) {
        padding: 4rem calc(2vw + 2.5rem) 3rem calc(1.5vw + 1rem) !important;

        .profile {
            &__header {
                text-align: left;
                align-items: flex-start;

                &--div {
                    &-1 {
                        display: flex;
                        width: 100%;
                        align-items: flex-start;
                        justify-content: flex-start;
                    }

                    &-2 {
                        margin-top: 0;
                    }
                }

                &--avatar {
                    margin-right: 2rem;
                }

                &--bio {
                    max-width: 70rem;
                }
            }

            &__tabs {
                flex-direction: column;

                &--cont {
                    margin-top: 0;
                    padding-top: 0;
                    top: 2.5rem;
                }
            }

            &__tab {
                margin-right: 0;
                margin-bottom: 0.8rem;

                &--btn {
                    justify-content: space-between;
                    padding: 0.8rem 1.8rem;
                    width: 18.5rem;
                }
            }

            &__main {
                &--section {
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-start;
                    margin-top: 4rem;
                    padding-right: 2.5rem;
                }
            }

            &__stories {
                ul {
                    li {
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                }

                &--other {
                    padding: 0;
                }
            }
        }
    }
`;
