import { FC } from "react";
import Head from "next/head";

type headAttributes = {
    title: string;
};

export const HeadTag: FC<headAttributes> = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content="My page title" key="title" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
    );
};
