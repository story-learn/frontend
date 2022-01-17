import styled from "styled-components";

export const StyledStoryContentActions = styled.div`
    position: relative;

    .story__contents {
        &-action {
        }

        &-actions {
            position: absolute;
            top: 2rem;
            right: 0rem;
            display: flex;
            flex-direction: column;
            background-color: var(--text-col-1);
            border-radius: var(--border-rad-sm);
            overflow: hidden;
            width: 0;
            transition: all 0.2s ease-out;

            &.show {
                width: max-content;
                max-width: 30rem;
                padding: 1rem;

                &::after {
                    /* border-bottom: 6px solid red; */
                    border-bottom-color: red;
                }
            }

            li {
                margin-bottom: 0.6rem;
                margin-top: 0.6rem;
                font-size: 1.2rem;

                &:last-child {
                }
            }

            button {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                svg {
                    margin-right: 0.4rem;
                    flex-shrink: 0;
                    height: 1.3rem;
                }
            }
        }
    }
`;
