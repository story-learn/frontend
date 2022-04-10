import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Button } from "../../components";
import { useProfileContext } from "../../context/pages/Profile";
import {
    Tabs as PTabs,
    HandleTabChanged,
    Tabs as ZTabs,
} from "../../pages/profiles/[id]";

interface ITabs {
    tabs: PTabs;
    handleTabChanged: HandleTabChanged;
}

const Tabs: FC = () => {
    // console.log("tabs rendered...");

    let { query, push } = useRouter();
    let {
        profile: {
            tabs: { lists, selected },
            // main: { data },
        },
        dispatchProfile,
    } = useProfileContext()!;

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

        dispatchProfile({ type: "profile_tab_selected", payload: selected });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const handleChangeTab = (tab: string) => {
        dispatchProfile({
            type: "profile_tab_selected",
            payload: tab,
        });
        push(`/profiles/${query.id}?tab=${tab}`);
    };

    return (
        <header className="profile__tabs--cont">
            <ul className="flex profile__tabs">
                {lists.map(({ tab, value }) => (
                    <li key={tab} className="profile__tab">
                        <Button
                            variant="no-border"
                            className={`flex profile__tab--btn ${
                                tab === selected && "profile__tab--btn-active"
                            } `}
                            // onClick={() => handleTabChanged(tab)}
                            onClick={() => {
                                handleChangeTab(tab);
                            }}
                            disabled={tab === selected}
                            text={
                                (
                                    <>
                                        {tab}{" "}
                                        {value !== null && (
                                            <span className="profile__tab--val flex">
                                                {value}
                                            </span>
                                        )}
                                    </>
                                ) as unknown as string
                            }
                        />
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Tabs;
