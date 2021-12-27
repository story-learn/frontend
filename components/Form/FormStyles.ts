import styled from "styled-components";

export const StyledForm = styled.form`
    .form {
        &__control {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 36rem;
        }

        &__input {
            &-processing,
            &-errorImg,
            &-icon {
                position: absolute;
                transform: translateY(-50%);
            }

            &-icon {
                right: 1rem;
            }

            &-icon {
                color: var(--form-icon);
                top: 2.4rem;
                width: 1.5rem;
            }

            &-processing {
                top: 0.3rem;
                right: 0.05rem;
            }
        }
    }
`;
