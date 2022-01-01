import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import backgroundImge from "/assests/webps/authBgDark.webp";
// import backgroundImge from "./../../public/assests/webps/authBgDark.webp"

export const StyledAuthPage = styled.main`
    padding-bottom: 4rem;
    padding-top: 4rem;
    min-height: calc(100vh - 6.08rem);

    header {
        text-align: center;
        padding: 0rem 1rem;

        h1 {
            margin: 0;
            margin-bottom: 4rem;
            font-size: 2.4rem;
        }

        p {
            margin-top: -3rem;
            margin-bottom: 4rem;
            line-height: 2.5rem;
            letter-spacing: -0.02rem;
            font-size: 1.4rem;
        }
    }

    form {
        width: 100%;
        max-width: 42.5rem;
        padding: 0 2rem;
        margin: 0 auto;

        & > div {
            margin-bottom: 2rem;
        }

        .form__control {
            max-width: none;

            &-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                align-items: flex-start;
            }

            &-submit {
                margin-top: 5.6rem;
                button {
                    width: 100%;
                }
            }
        }
    }

    input {
        padding-right: 2.7rem;
    }

    .other {
        text-align: center;
        max-width: 42.5rem;
        margin-left: auto;
        margin-right: auto;
        font-size: 1.3rem;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-top: -1rem;

        &-signin {
            margin-top: 3rem;
        }

        &-forgot {
            max-width: 38.5rem;
            text-align: right;
            padding: 0;
        }
    }

    @media screen and (${device.tablet}) {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center bottom;
        background-image: var(--auth-bg);
    }
`;
