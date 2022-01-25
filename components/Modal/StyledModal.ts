import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledModal = styled.div`
    background-color: transparent;
    position: fixed;
    inset: 0;
    top: 6.1rem;
    bottom: 8.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s linear;

    &.enter {
        opacity: 0;
        .modal {
            &__cont {
                transform: translateY(-40%);
            }
        }
    }

    &.enter-done {
        opacity: 1;

        .modal {
            &__cont {
                transform: translateY(0);
            }
        }
    }

    &.exit {
        opacity: 0;

        .modal {
            &__cont {
                transform: translateY(-40%);
            }
        }
    }

    .modal {
        &__cont {
            position: relative;
            width: 90%;
            max-width: 40rem;
            background-color: var(--color-1);
            border-radius: var(--border-rad-sm);
            transition: all 0.2s linear;
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
            border: var(--modal-border);
        }

        &__header,
        &__content {
            padding-left: 2rem;
            padding-right: 2rem;
        }

        &__header {
            font-weight: 700;
            text-align: center;
            margin-bottom: 2rem;
        }

        &__content {
            max-height: 50vh;
            overflow: auto;
            opacity: 0.7;
        }

        &__close {
            position: absolute;
            top: 2.4rem;
            right: 1rem;
            transform: translateY(-50%);
            color: red;
        }
    }

    .modalAuth {
        &__links {
            a {
                width: 100%;
                margin-top: 2rem;
                opacity: 1;

                &:nth-child(2) {
                    margin-top: 0.8rem;
                }
            }
        }
    }

    &.modalUpload {
        top: 4rem;
        bottom: 0;
        /* background-color: green; */

        .modal {
            &__cont {
                padding-top: 0.4rem;
                padding-bottom: 1rem;
            }

            &__content {
                height: max-content;
                max-height: 80vh;
            }
        }
    }

    .modalUpload {
        &__title {
            font-weight: 500;
            text-align: center;
            font-size: 2.5rem;
        }

        &__control {
            margin-bottom: 2.5rem;
        }

        &__label,
        &__textarea {
            display: block;
            width: 100%;
            border-radius: var(--border-rad-sm);
        }

        &__label {
            font-size: 1.6rem;
            margin-bottom: 0.2rem;
        }

        &__textarea {
            border: 0.1rem solid transparent;
            outline: none;
            background-color: var(--box-border);
            resize: none;
            padding: 0.5rem 0.8rem;
        }

        &__file {
            &-input {
                width: 0.1px;
                height: 0.1px;
                opacity: 0;
                overflow: hidden;
                position: absolute;
                z-index: -1;

                &:focus + label {
                    border-color: var(--primary);
                    outline: none;
                }
            }

            &-label {
                border: 0.1rem solid transparent;
                cursor: pointer;
                background-color: var(--box-border);
                color: var(--color-4);
                display: inline-flex;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                padding: 1.5rem 0.5rem 1.5rem 1rem;
                border-radius: var(--border-rad-sm);
                transition: all 0.3s linear;

                span {
                    margin-right: 1rem;
                    width: 4rem;
                    height: 4rem;
                }

                &:hover {
                    opacity: 0.6;
                }
            }

            &-output {
                margin-top: 3rem;
                display: block;
                width: 100%;
                border-radius: var(--border-rad-sm);
                transition: all 0.3s linear;
                background-color: var(--box-border);
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 0;
                transition: all 0.3s linear;

                &.show {
                    height: 30rem;
                    padding: 1.5rem;
                }

                figure {
                    border-radius: var(--border-rad-sm);
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
            }
        }

        &__btns {
            button {
                width: 100%;
                font-weight: 400;

                &:nth-child(2) {
                    margin-top: 0.8rem;
                }
            }
        }
    }

    @media screen and (${device.tablet}) {
        top: 7rem;
        bottom: 0;
        left: 7.5rem;

        &.modalUpload {
            left: 0;

            .modal {
                &__content {
                    max-height: 88vh;
                }
            }
        }
    }
`;
