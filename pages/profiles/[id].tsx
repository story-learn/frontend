import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { LoadingIndicator } from "../../components";
import { StyledProfilePage } from "../../components/Styles/StyledProfilePage";
// import { useAuth } from "../../context/AuthContext";
import {
    ProfileProvider,
    useProfileContext,
} from "../../context/pages/Profile";
import { useAuth } from "../../Hooks/useAuth";
import { useProfile as useProfileFetch } from "../../Hooks/useProfile";
import { Profile as IProfile } from "../../interfaces";
import { Main, MetaHead, ProfileHeader } from "../../modules/Profile";

export interface Tab {
    tab: string;
    value: number | null;
    key: string;
}

export interface Tabs {
    lists: Tab[];
    selected: Tab["tab"];
}

export type HandleTabChanged = (selected: Tab["tab"]) => void;

const ProfileFC: FC = () => {
    const { user, authenticating } = useAuth();
    let { query, push, replace, isReady } = useRouter();
    let userId = query.id as string | undefined;
    // do not fetch if authenticating is true
    // user needs to be authenticated if route is "/profiles/me" -- don not fetch if user is not authenticated
    //
    let { data, error, loading } = useProfileFetch<IProfile>(
        authenticating ? "" : userId === "me" ? (!user ? "" : userId) : userId
    );
    const { dispatchProfile, profile } = useProfileContext();
    const { main } = profile;

    useEffect(() => {
        if (Object.keys(query).length === 0 || authenticating) return;

        if (userId === "me" && !user) {
            push("/signin"); // user needs to be authenticated if route is "/profiles/me"
            return;
        }

        if (user && +user.user_id === Number(userId)) {
            // change route name to "me"
            replace("/profiles/me", undefined, { shallow: true });
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, user]);

    useEffect(() => {
        if (!isReady) return;
        dispatchProfile({
            type: "profile_route_changed",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        dispatchProfile({
            type: "profile_main",
            payload: { data, error, loading },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading, error]);

    if (authenticating) return null;

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
