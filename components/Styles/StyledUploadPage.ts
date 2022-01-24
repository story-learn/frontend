import styled from "styled-components";

export const StyledUploadPage = styled.main`
    .upload {
        &__header {
            box-shadow: 0px 1px 1px var(--color-3);
            padding-bottom: 3.5rem;

            &-head,
            &-para {
                text-align: center;
                max-width: 72rem;
                margin-right: auto;
                margin-left: auto;
                padding-right: 2rem;
                padding-left: 2rem;
            }

            &-para {
                color: var(--color-4);
                font-size: 2rem;
            }
        }

        &__btns {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 3rem;
        }

        &__btn {
            background-color: #f0f0f0;

            &-text {
                margin-right: 3rem;
            }

            &-image {
                color: var(--primary);
            }
        }
    }
`;
