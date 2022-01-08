import styled from "styled-components";
import { device } from "../../styles/breakpoints";

export const PageContainer = styled.div`
    @media screen and (${device.tablet}) {
        min-height: calc(100vh - 7rem);
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        column-gap: 2rem;

        & > * {
            &:nth-child(2) {
                padding-top: 1.5rem;
                width: 100%;
            }
        }
    }
`;
