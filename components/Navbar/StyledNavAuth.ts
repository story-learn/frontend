import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledNavAuth = styled.nav`
    position: relative;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    /* border-bottom: 0.1rem solid var(--border-col); */
    /* margin-bottom: 3rem; */
    background-color: var(--auth-bg);
    border-bottom: 0.1rem solid var(--color-3);

    .container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .homeLogo {
        margin-inline-end: auto;
        margin-right: auto;
        width: 10rem;
    }

    .toggle {
        margin-right: 1rem;
    }

    .nav {
        &__toggle {
            &:focus {
                border: none;
                outline: none;
            }
        }

        &__others {
            --top: 6.1rem;
            /* background-color: var(--stark); */
            background-color: var(--general-bg);
            position: absolute;
            left: -100%;
            right: 0;
            top: var(--top);
            height: calc(100vh - var(--top));
            width: 100%;
            z-index: 10;
            transition: left 0.3s linear;
            padding-top: 3rem;

            &-open {
                left: 0%;
                padding-right: 2rem;
                padding-left: 2rem;
            }
        }
    }

    @media screen and (${device.tablet}) {
        .nav {
            &__toggle {
                display: none;
            }

            &__others {
                background-color: transparent;
                position: static;
                width: auto;
                height: auto;
                padding: 0;
            }
        }
    }
`;
