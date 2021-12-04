import type { AppProps } from "next/app";
import GlobalStyle from "../styles/globalStyles";
import { ResetStyle } from "../styles/reset";
import { ElementStyles } from "../styles/elementStyles";
import { UtilityStyles } from "../styles/utility";
import { Layout } from "../components";
import { VariablesStyle } from "../styles/variables";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ResetStyle />
            <VariablesStyle />
            <GlobalStyle />
            <ElementStyles />
            <UtilityStyles />
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </>
    );
}

export default MyApp;
