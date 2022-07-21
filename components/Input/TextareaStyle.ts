import styled from "styled-components";

export const StyledTextArea = styled.div`
    position: relative;

    .form {
        &__textarea {
            border: 0.1rem solid transparent;
            outline: none;
            background-color: var(--box-bg);
            resize: none;
            padding: 1.5rem 1.8rem;
            display: block;
            width: 100%;
            border-radius: var(--border-rad-sm);

            &--label {
                font-size: 1.6rem;
                margin-bottom: 0.2rem;
                display: block;
                width: 100%;
                border-radius: var(--border-rad-sm);
            }

            &--length {
                position: absolute;
                bottom: -2.2rem;
                right: 0.3rem;
                font-size: 1.2rem;
                color: var(--primary);
                font-weight: bolder;
            }
        }
    }
`;
