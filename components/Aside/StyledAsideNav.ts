import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const StyledAsideNav = styled.nav`
    border-top: 0.1rem solid var(--color-3);
    /* background-color: var(--text-col-1); */
    background-color: var(--box-bg);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;

    ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    a {
        color: var(--color-4);
        font-weight: bolder;

        &.upload {
            color: var(--general-fg);
        }

        &.active {
            color: var(--primary);
        }
    }

    @media screen and (${device.tablet}) {
        position: static;
        padding: 0rem;
        top: 0;
        width: max-content;
        display: flex;
        align-items: flex-start;
        border-right: 0.1rem solid var(--color-3);
        border-top: 0;

        & > div {
            position: sticky;
            top: 0;
            max-height: calc(100vh - 7rem);
            overflow-y: auto;
        }

        ul {
            flex-direction: column;
            padding: 2rem 1.7rem;
            row-gap: 3rem;
        }
    }
`;
