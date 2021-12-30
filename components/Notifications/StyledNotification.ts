import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledNotification = styled.div`
    background-color: #333;
    width: 90vw;
    max-width: 50rem;
    padding: 1.3rem 1rem 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: var(--border-rad-sm);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border: 0.1rem solid var(--border-col);

    &.notification__info {
        .notification__content {
            &-header,
            a {
                color: #4d63d4;
            }
        }
    }

    &.notification__error {
        .notification__content {
            &-header,
            a {
                color: #eb5757;
            }
        }
    }

    &.notification__success {
        .notification__content {
            &-header,
            a {
                color: #27ae60;
            }
        }
    }

    .notification {
        &__icon {
            flex: 0 0 auto;
            margin-right: 0.8rem;
            margin-top: 0.2rem;
        }

        &__close {
            flex: 0 0 auto;
            margin-left: 0.5rem;
            margin-top: 0.6rem;
        }

        &__content {
            width: 100%;
            &-header {
                margin-bottom: 1rem;
            }
            &-short {
                width: 100%;
                flex: 1;
            }
            a {
                text-decoration: underline;
                font-weight: 600;
                transition: all 0.2s linear;

                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }
`;
