import styled from "styled-components";

export const StyledProfile = styled.div`
    display: flex;

    figure {
        margin-right: 1rem;
    }

    .profile {
        &__detail {
        }

        &__name {
            font-weight: bolder;
            font-size: 1.8rem;
        }

        &__username {
            margin-top: -0.5rem;
            font-size: 1.4rem;
            opacity: 0.7;
        }
    }
`;
