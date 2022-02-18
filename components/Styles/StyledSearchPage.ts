import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledSearchPage = styled.main`
    margin-top: 2rem;

    .search {
        &__form {
            max-width: none;
        }

        &__form,
        &__category {
            padding: 0 2rem;
        }

        &__header {
            overflow: hidden;
            height: 0;
            width: 0;

            &-h1 {
                margin: 0;
            }

            span {
                font-weight: bolder;
            }
        }

        &__container {
        }

        &__category {
            padding-top: 4rem;
            padding-bottom: 2.4rem;
            position: sticky;
            top: 0rem;
            background-color: var(--general-bg);
            z-index: 2;

            &-btn {
                &::nth-child(1) {
                    margin-right: 1rem;
                }

                padding: 1.4rem 4.75rem 1.4rem 3.05rem;
                border-radius: var(--border-rad-xs);
                font-size: 1.6rem;
                color: var(--form-icon);
                font-weight: 600;

                &:hover {
                    opacity: 0.7;
                }

                &.active {
                    background-color: var(--color-1);
                    box-shadow: 0px 0.1rem 0.1rem rgba(0, 0, 0, 0.12);
                    color: var(--color-6);
                }
            }
        }
    }

    @media screen and (${device.tablet}) {
        padding-left: calc(1.5vw + 1rem);
        padding-right: calc(2vw + 2.5rem);
        padding-top: 0 !important;

        .search {
            &__container {
                display: flex;
                gap: calc(3vw + 2rem);
                align-items: flex-start;
                margin-top: 5rem;
            }

            &__header {
                width: auto;
                height: auto;
            }

            &__form {
                display: none;
            }

            &__category {
                margin-top: 0;
                margin-bottom: 0;
                /* background-color: brown; */
                padding-left: 0;
                padding-right: 0;
                padding: 0;
                top: 2rem;
                flex-grow: 0;
                min-width: max-content;
                display: flex;
                flex-direction: column;

                &-btn {
                    padding: 1.25rem 13.4rem 1.25rem 2.4rem;
                }
            }
        }
    }

    @media screen and (${device.laptop}) {
        padding-left: 6.4rem;
        padding-right: 4rem;

        .search {
            &__container {
                gap: 15.2rem;
            }
        }
    }
`;
