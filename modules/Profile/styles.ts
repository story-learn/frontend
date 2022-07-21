import styled from "styled-components";

export const StyledModalFormAvatar = styled.div`
    position: relative;
    max-width: 12.8rem;
    max-height: 12.8rem;
    margin: 0 auto 2rem;

    .profile__header--avatar {
        img {
            border-radius: 50%;
        }
    }

    .form__file {
        position: absolute;
        top: 66%;
        right: 0;
    }
`;
