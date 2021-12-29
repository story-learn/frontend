import Document, {
    DocumentContext,
    DocumentInitialProps,
    Main,
    NextScript,
    Head,
    Html,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

function setInitialColorMode() {
    function getInitialColorMode() {
        const preference = window.localStorage.getItem("theme");
        const hasPreference = typeof preference === "string";

        /**
         * If the user has explicitly chosen light or dark,
         * use it. Otherwise, this value will be null.
         */
        if (hasPreference) {
            return preference;
        }

        // If there is no saved preference, use a media query
        const mediaQuery = "(prefers-color-scheme: dark)";
        const mql = window.matchMedia(mediaQuery);

        const hasMediaPreference = typeof mql.matches === "boolean";
        if (hasMediaPreference) {
            return mql.matches ? "dark" : "light";
        }

        // default to 'light'.
        return "light";
    }

    const colorMode = getInitialColorMode();
    const root = document.documentElement;
    root.style.setProperty("--initial-color-mode", colorMode);

    // add HTML attribute if dark mode
    if (colorMode === "dark")
        document.documentElement.setAttribute("data-theme", "dark");
}

// our function needs to be a string
const blockingSetInitialColorMode = `(function() {
        ${setInitialColorMode.toString()}
        setInitialColorMode();
})()
`;

export default class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en" data-theme="dark">
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: blockingSetInitialColorMode,
                        }}
                    ></script>
                    <Main />
                    {/* mount modal portal here */}
                    <div id="portal" />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
