import styled from "styled-components";

export const StyledVerifyPage = styled.main`
    min-height: 90vh;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-left: 2rem;
    padding-right: 2rem;
    font-size: 1.6rem;

    .verify {
        &__header {
            margin-top: auto;
            margin-bottom: 8.8rem;

            &-fig {
                background-color: var(--primary-20);
                padding: 2rem;
                width: 8rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &__para {
            max-width: 49rem;
        }

        &__email {
            margin-top: auto;
            margin-bottom: 2rem;
            font-size: 1.4rem;

            button {
                color: var(--primary-80);
                border: 0.1rem solid transparent;

                &:hover {
                    text-decoration: underline;
                }

                &:focus {
                    border-color: inherit;
                    text-decoration: none;
                }
            }
        }
    }
`;
