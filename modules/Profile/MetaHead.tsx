import Head from "next/head";
import { FC } from "react";
import { Profile } from "../../interfaces";

type PMeta = Pick<Profile, "username">;

interface IMeta extends PMeta {}

const MetaHead: FC<IMeta> = ({ username }) => {
    return (
        <Head>
            <title>{username} - Story Learn</title>
        </Head>
    );
};

export default MetaHead;
