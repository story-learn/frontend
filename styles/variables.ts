import { createGlobalStyle } from "styled-components";

export const VariablesStyle = createGlobalStyle`
    :root {
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
        --box-shadow-bg: #C4C4C4;

        /* mode toggle */
        --toggle-checked-bg: #121211;
        --toggle-unchecked-bg: #0A0601;

        /* font */
        --font-family-primary: 'Quicksand', sans-serif;
    }
`;
