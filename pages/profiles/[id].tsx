import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { LoadingIndicator } from "../../components";
import { StyledProfilePage } from "../../components/Styles/StyledProfilePage";
import {
    ProfileProvider,
    useProfileContext,
} from "../../context/pages/Profile";
import { useProfile as useProfileFetch } from "../../Hooks/useProfile";
import { Profile as IProfile } from "../../interfaces";
import { Main, MetaHead, ProfileHeader } from "../../modules/Profile";

export interface Tab {
    tab: string;
    value: number | null;
}

export interface Tabs {
    lists: Tab[];
    selected: Tab["tab"];
}

export type HandleTabChanged = (selected: Tab["tab"]) => void;

const ProfileFC: FC = () => {
    let { query, push } = useRouter();
    let userId = query.id as string | undefined;
    let { data, error, loading } = useProfileFetch<IProfile>(userId);
    const { dispatchProfile, profile } = useProfileContext();
    const { main } = profile;

    useEffect(() => {
        dispatchProfile({
            type: "profile_main",
            payload: { data, error, loading },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading, error]);

    return (
        <>
            <MetaHead
                username={
                    main.loading
                        ? "Loading.."
                        : main.error
                        ? "Error"
                        : main.data!.username
                }
            />
            <StyledProfilePage>
                {main.loading ? (
                    <LoadingIndicator />
                ) : main.error ? (
                    <div>There was an error..</div>
                ) : (
                    <>
                        <ProfileHeader />
                        <Main id={main.data!.id} />
                    </>
                )}
            </StyledProfilePage>
        </>
    );
};

const Profile: NextPage = () => {
    return (
        <ProfileProvider>
            <ProfileFC />
        </ProfileProvider>
    );
};

export default Profile;
