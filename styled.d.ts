import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        light: {
            main: string;
        };
        dark: {
            main: string;
        };
    }
}
