import { createGlobalStyle } from "styled-components";

export const VariablesStyle = createGlobalStyle`
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
            /* --stark: #333333; */
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

        --primary: #FF9F06;
        --primary-10: rgba(255, 159, 6, 0.1);
        --primary-20: rgba(255, 159, 6, 0.2);
        --primary-80: rgba(255, 159, 6, 0.8);

        --secondary: #7DBC0F;
        --secondary-10: rgba(125, 188, 15, 0.1);
        --secondary-20: rgba(125, 188, 15, 0.2);
        --secondary-80: rgba(125, 188, 15, 0.8);


        --error: #E85353bb;

        /* form */
        --form-icon: #838383;

        /* borders */
        --border-rad-xs: 0.8rem;
        --border-rad-sm: 1rem;
        --border-rad-md: 1.5rem;
        --border-rad-lg: 2rem;

        /* box shadow */
        --box-shadow-bg: "#C4C4C4";

        /* mode toggle */
        --toggle-checked-bg: #121211;
        --toggle-unchecked-bg: #0A0601;

    }
`;
