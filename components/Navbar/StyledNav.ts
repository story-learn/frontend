import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledNav = styled.nav`
    position: relative;
    border-bottom: 0.1rem solid var(--border-col);

    .container {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .homeLogo {
        width: 100%;
        flex: 1;
        max-width: 10rem;
        min-width: 7rem;
    }

    .toggle {
        margin-left: auto;
        margin-right: 1.2rem;
    }

    .nav {
        &__large {
            display: none;
        }

        &__auth {
            &-options {
                --top: 6rem;
                background-color: var(--stark);
                position: absolute;
                left: -100%;
                right: 0;
                top: var(--top);
                height: calc(100vh - var(--top));
                width: 100%;
                z-index: 10;
                transition: left 0.3s linear;
                display: flex;
                flex-direction: column;

                &-open {
                    left: 0%;
                    padding-right: 2rem;
                    padding-left: 2rem;
                }

                li {
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }
            }

            &-btn {
                height: 2.5rem;

                &,
                & figure {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                svg {
                    &:nth-child(2) {
                        display: none;
                    }
                }
            }
        }

        &__upload {
            color: var(--stark-3);
        }

        &__login {
            padding: 0.4rem 2rem 0.6rem;
            margin-left: 1rem;
            margin-right: 2rem;
            font-size: 1.4rem;
        }
    }

    @media screen and (${device.tablet}) {
        .nav {
            &__large {
                display: block;
            }
            &__auth {
                &-cont {
                    position: relative;
                }
                &-options {
                    top: 4rem;
                    left: auto;
                    right: -1rem;
                    width: max-content;
                    background: var(--input-bg-1);
                    padding-left: 1rem;
                    padding-right: 1rem;
                    border-radius: var(--border-rad-xs);
                    height: 0;
                    overflow: hidden;
                    transition: all 0.2s linear;
                    gap: 1.4rem;

                    &::after {
                        position: absolute;
                        top: -6px;
                        right: 1.4rem;
                        display: inline-block;
                        border-right: 6px solid transparent;
                        border-bottom: 6px solid var(--input-bg-1);
                        border-left: 6px solid transparent;
                        content: "";
                        overflow: initial;
                    }

                    &-open {
                        height: auto;
                        overflow: initial;
                        padding: 1.2rem 1.5rem;
                    }

                    li {
                        margin: 0;
                    }
                }

                &-btn {
                    svg {
                        &:nth-child(1) {
                            display: none;
                        }
                        &:nth-child(2) {
                            display: block;
                        }
                    }
                }
            }
        }
    }
`;
