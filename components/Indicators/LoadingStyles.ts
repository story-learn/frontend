import styled, { keyframes } from "styled-components";

const spanOneAni = keyframes`
    from {
        transform: translateX(1.2rem);
    }
`;

const spanTwoAni = keyframes`
    from {
        transform: translateX(-1.2rem);
    }
`;

export const StyledLoading = styled.div`
    width: max-content;
    text-align: center;
    margin: auto;

    span {
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;

        &:first-child {
            background-color: var(--secondary-20);
            animation-name: ${spanOneAni};
        }

        &:last-child {
            background-color: var(--primary-20);
            animation-name: ${spanTwoAni};
        }
    }
`;
