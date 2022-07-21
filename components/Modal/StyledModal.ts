import styled from "styled-components";
import { device, size } from "../../styles/breakpoints";

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
        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        &__title {
            font-weight: 500;
            text-align: center;
            font-size: 2.5rem;
        }

        &__switch {
            color: var(--primary);
            font-size: 3rem;

            &:hover {
                opacity: 0.6;
            }
        }

        &__control {
            margin-bottom: 2.5rem;

            &-text {
                position: relative;
                margin-bottom: 4rem;
            }
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
            padding: 1.5rem 1.8rem;

            &-length {
                position: absolute;
                bottom: 0.8rem;
                bottom: -2.2rem;
                right: 1.6rem;
                right: 0.3rem;
                font-size: 1.2rem;
                color: var(--primary);
                font-weight: bolder;
            }
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

    &.modalEditProfile {
        .modal {
            &__cont {
            }

            &__content {
                opacity: 1;
            }
        }

        .form {
            &__control {
                margin-bottom: 2rem;
                margin: 0 auto 2rem;
            }

            &__input,
            &__textarea {
                /* background-color: var(--input-bg-1); */
            }

            &--action {
                margin-top: 4rem;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
                gap: 1.5rem;
                justify-items: center;

                button {
                    padding: 0.9rem 4rem 1rem;
                    margin: 0rem;
                }
            }

            &__submit {
                color: var(--color-6);
            }

            &__cancel {
                background-color: transparent;
                color: var(--primary-80);
            }
        }
    }

    @media screen and (max-width: ${size.tablet}) {
        &.modalEditProfile {
            background-color: var(--general-bg);
            bottom: 7rem;

            .modal {
                &__cont {
                    height: 100%;
                    background-color: var(--general-bg);
                    width: 100%;
                    max-width: none;
                    border: 0;
                    border-radius: 0;
                }

                &__content {
                    opacity: 1;
                    max-height: 90%;
                }
            }

            .form {
                &__control {
                    max-width: 40rem;
                }
            }
        }
    }

    @media screen and (${device.tablet}) {
        top: 7rem;
        bottom: 0;
        left: 7.5rem;

        &.modalEditProfile {
            .modal {
                &__cont {
                    max-width: 50rem;
                    /* max-height: none; */
                }

                &__content {
                    opacity: 1;
                }
            }

            .form {
                &__control {
                    max-width: 52rem;
                }

                &__input,
                &__textarea {
                    background-color: var(--input-bg-1);
                    font-size: 1.2rem;
                }

                &__textarea {
                    max-height: 7rem;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    overflow-y: auto;
                }
            }
        }
    }
`;
