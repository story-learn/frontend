import { createGlobalStyle } from "styled-components";

export const ModeVariables = createGlobalStyle`
    :root {
        --stark: #FFFFFF;
        --stark-2: #333333;
        --stark-3: #838383;

        --input-bg-1: #fef2f4;
        --icon-1: #230b34;

        --disabled-bg: #f0f0f0;
        --disabled-fg: #C2C2C2;
        
        --box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.12);

        --border-col: rgba(0, 0, 0, 0.12);

        --auth-bg: url("/assests/webps/authBgLight.webp");
        
        &[data-theme="dark"] {
            --stark: #0A0601;
            --stark-2: #F0F0F0;
            --stark-3: #F7F2F4;
            
            --input-bg-1: #121211;
            --icon-1: #fff;
            
            --disabled-bg: #838383;
            --disabled-fg: #C2C2C2;

            --box-shadow: 0px 1px 1px #202020;

            --border-col: rgba(32, 32, 32, 1);

            --auth-bg: url("/assests/webps/authBgDark.webp");
        }
    }
`;
