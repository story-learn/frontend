import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledBookMarkPage = styled.main`
    .bookmark {
        &__header {
            padding-left: 2rem;

            h1 {
                margin-bottom: 0;
            }
        }

        &__result {
            &--empty {
                padding: 2rem;
                font-size: 1.5rem;
            }
        }
    }

    form {
        /* padding: 2rem 2rem 0 0; */
        padding-right: 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        position: sticky;
        top: 0rem;
        padding-top: 2rem;
        background-color: var(--general-bg);
        z-index: 90;

        & > * {
            margin-bottom: 1rem;
            margin-left: 2rem;
            flex: 1 1 30rem;
        }
    }

    .form {
        &__filter {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;

            & > * {
                margin-right: 2rem;
            }

            &--para {
                font-size: 1.6rem;
            }

            & > button {
                padding: 0.2rem 1.3rem 0.3rem;
                margin-right: 0;
                font-size: 1.2rem;
                border-radius: 0.5rem;
                font-weight: 500;
                background-color: var(--primary-80);
                border: 0.1rem solid transparent;

                &:focus {
                    border-color: currentColor;
                }
            }
        }
    }

    @media screen and (${device.tablet}) {
        padding-right: 2rem;
        /* background-color: orange !important; */
        .bookmark {
            &__cont {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                flex-wrap: wrap;
                gap: 2rem;

                & > * {
                    flex: 1 1 35rem;
                }
            }

            &__result {
                padding-top: 2rem;

                &--empty {
                    padding-top: 0rem;
                }
            }
        }
    }

    @media screen and (${device.laptop}) {
        .bookmark {
            &__cont {
                gap: 3.5rem;
            }
        }

        form {
            max-width: 40rem;
        }

        li {
            margin-left: 0;
        }
    }
`;
