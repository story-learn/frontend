import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledModal = styled.div`
    background-color: transparent;
    position: fixed;
    inset: 0;
    top: 6.1rem;
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
            }
        }
    }

    @media screen and (${device.tablet}) {
        top: 7rem;
    }
`;
