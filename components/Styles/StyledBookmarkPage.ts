import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledBookMarkPage = styled.main`
    .bookmark {
        &__header {
            padding-left: 2rem;
        }
    }

    form {
        /* padding: 2rem 2rem 0 0; */
        padding-right: 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;

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
        }
    }

    @media screen and (${device.tablet}) {
        padding-right: 2rem;
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
