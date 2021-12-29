import styled from "styled-components";

export const StyledModal = styled.div`
    background-color: var(--disabled-bg);
    position: fixed;
    inset: 0;
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
            max-width: 60rem;
            background-color: var(--stark);
            color: var(--stark-2);
            border-radius: var(--border-rad-sm);
            transition: all 0.2s linear;
        }

        &__header,
        &__content {
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
        }

        &__header {
            border-bottom: 0.2rem solid var(--border-col);
            font-weight: 700;
        }

        &__content {
            max-height: 50vh;
            overflow: auto;
        }

        &__close {
            position: absolute;
            top: 2.4rem;
            right: 1rem;
            transform: translateY(-50%);
            color: red;
        }
    }
`;
