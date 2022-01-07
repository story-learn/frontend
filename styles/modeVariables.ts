import { createGlobalStyle } from "styled-components";

export const ModeVariables = createGlobalStyle`
    :root {
        --disabled-fg: #C2C2C2;
        
        --auth-bg-img: url("/assests/webps/authBgLight.webp");

        --modal-border: 0.3rem dashed #E8E6F0;

        --general-bg: #FAFAFA;
        --general-fg: #000000;
        --color-1: #FFFFFF;
        --color-2: #C2C2C2;
        --color-3: rgba(0, 0, 0, 0.12);
        --color-4: #838383;
        --auth-bg: #FFFFFF;

        --disabled: #F0F0F0;

        --box-bg: #F7F2F4;
        --box-border: #E8E6F0;

        --text-col-1: #ffffff;

        
        &[data-theme="dark"] {
            --disabled-fg: #C2C2C2;

            --auth-bg-img: url("/assests/webps/authBgDark.webp");

            --modal-border: 0.3rem dashed #232326;

            --general-bg: #0A0601;
            --general-fg: #F6F2F4;
            --color-1: #121211;
            --color-2: #C2C2C2;
            --color-3: rgba(32, 32, 32, 1);
            --color-4: #f7f2f4;
            --auth-bg: #0A0601;

            --disabled: #838383;

            --box-bg: #121211;
            --box-border: #232326;

            --text-col-1: #0A0601;
        }
    }
`;
