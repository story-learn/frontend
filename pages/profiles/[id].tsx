import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingIndicator } from "../../components";
import { StyledProfilePage } from "../../components/Styles/StyledProfilePage";
import { useProfile } from "../../Hooks/useProfile";
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

const Profile: NextPage = () => {
    let { query, push } = useRouter();
    let userId = query.id as string | undefined;
    let selectedTab = query.tab as string | undefined;
    let { data, error, loading } = useProfile<IProfile>(userId);

    const [tabs, setTabs] = useState<Tabs>({
        lists: [
            { tab: "Stories", value: 23 },
            { tab: "Likes", value: null },
            { tab: "Followers", value: 23 },
            { tab: "Following", value: 23 },
        ],
        selected: selectedTab || "",
    });

    const handleTabChanged: HandleTabChanged = (selected) => {
        setTabs((prev) => ({ ...prev, selected }));
    };

    useEffect(() => {
        let userId = query.id as string | undefined;
        let selected = query.tab as string;

        // query will be empty on initial load
        // userId and selected will be undefined on initial load
        // userId will be available on initial mount
        // selected might be available on initial mount base on if url params has "tab"
        // do not use selected to check because it will be undefined if there is no tab in the url params
        if (!userId) return;

        // create possible tabs in case user manipulate url params tab to include another value like "Schools" which shouldn't be among the possible tabs
        let possibeTabs = ["Stories", "Likes", "Followers", "Following"];

        selected = possibeTabs.find((tabs) => tabs === selected) || "Stories";

        setTabs((prev) => ({ ...prev, selected }));
    }, [query]);

    useEffect(() => {
        // this above logic applies to the following
        let userId = query.id;
        if (!userId) return;

        let selected = tabs.selected;
        let tabUrl = `/profiles/${userId}?tab=${selected}`;

        push(tabUrl, undefined, { shallow: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabs.selected]);

    return (
        <>
            <MetaHead
                username={
                    loading ? "Loading.." : error ? "Error" : data!.username
                }
            />
            <StyledProfilePage>
                {loading ? (
                    <LoadingIndicator />
                ) : error ? (
                    <div>There was an error..</div>
                ) : (
                    <>
                        <ProfileHeader {...data!} />
                        <Main tabs={tabs} handleTabChanged={handleTabChanged} />
                    </>
                )}
            </StyledProfilePage>
        </>
    );
};

export default Profile;
