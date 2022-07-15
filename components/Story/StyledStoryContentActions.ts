import styled from "styled-components";

export const StyledStoryContentActions = styled.div`
    position: relative;

    .story__contents {
        &-action {
            padding: 0.8rem;

            &--follow {
                overflow: hidden;

                button {
                    max-width: 13rem;

                    span {
                        width: 80%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        display: block;
                    }
                }
            }
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
            height: 0;
            transition: all 0.2s ease-out;
            z-index: 1;

            &.show {
                height: max-content;
                width: max-content;

                &::after {
                    border-bottom-color: red;
                }
            }

            li {
                margin-bottom: 0.6rem;
                margin-top: 0.6rem;
                font-size: 1.2rem;
                padding: 0.4rem 1.5rem 0.5rem;

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
