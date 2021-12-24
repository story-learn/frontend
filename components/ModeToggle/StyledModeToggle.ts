import styled from "styled-components";

export const StyledModeToggle = styled.label`
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    gap: 1ch;

    .toggle {
        &__display {
            /* --offset: 0.25rem;
            --diameter: 1.8rem;
             */
            --offset: 0.6rem;
            --diameter: 1.8rem;

            display: inline-flex;
            align-items: center;
            justify-content: space-around;

            width: calc(var(--diameter) * 2 + var(--offset) * 2);
            height: calc(var(--diameter) + var(--offset) * 2);

            border: 0.1rem solid var(--primary);

            position: relative;
            border-radius: var(--border-rad-lg);
            background-color: var(--toggle-unchecked-bg);

            transition: 0.25s;
            cursor: pointer;

            &::before {
                content: "";

                width: var(--diameter);
                height: var(--diameter);
                border-radius: 50%;

                box-sizing: border-box;
                border: 0.1 solid rgb(0 0 0 / 0.2);

                position: absolute;
                z-index: 2;
                top: 50%;
                left: var(--offset);
                transform: translate(0, -50%);

                background-color: #fff;
                transition: inherit;
            }
        }

        &__input {
            width: 0;
            height: 0;
            position: absolute;

            &:focus + .toggle__display {
                outline: 1px dotted #212121;
                outline: 1px auto -webkit-focus-ring-color;
            }

            &:focus:not(:focus-visible) + .toggle__display {
                outline: 0;
            }

            &:checked + .toggle__display {
                background-color: var(--toggle-checked-bg);
            }

            &:checked + .toggle__display::before {
                transform: translate(100%, -50%);
            }
        }

        &__icon {
            display: inline-block;
            width: 1em;
            height: 1em;
            color: inherit;
            fill: currentcolor;
            vertical-align: middle;

            &--cross {
                color: #e74c3c;
                font-size: 85%;
            }

            &--checkmark {
                color: #1fb978;
            }
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .toggle__display {
            transition-duration: 0ms;
        }
    }
`;
