import type { AppProps } from "next/app";
import GlobalStyle from "../styles/globalStyles";
import { ResetStyle } from "../styles/reset";
import { ElementStyles } from "../styles/elementStyles";
import { UtilityStyles } from "../styles/utility";
import { Layout, Notifications } from "../components";
import { VariablesStyle } from "../styles/variables";
import { AuthProvider } from "../context/AuthContext";
import { ModeVariables } from "../styles/modeVariables";
import { StoriesProvider } from "../context/StoriesContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ResetStyle />
            <VariablesStyle />
            <GlobalStyle />
            <ModeVariables />
            <ElementStyles />
            <UtilityStyles />
            <Notifications />
            <AuthProvider>
                <StoriesProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </StoriesProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
