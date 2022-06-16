import { FC, useState } from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { useSWRFetch } from "../../Hooks/useSwrFetch";
import { HomeStory } from "../../interfaces";
import { IAccount } from "../../components/Accounts/Account";

import { Tabs } from "../../pages/profiles/[id]";

type IPeople = Pick<Tabs, "selected">;

interface TPeople extends IPeople {}

interface NPeople {
    url: string;
    dispatchFollowAction: (status?: "failed" | undefined) => void;
}

const People: FC<NPeople> = ({ url, dispatchFollowAction }) => {
    let { data, error, loading } = useSWRFetch<{
        num_of_pages: number;
        object_count: number;
        previous: null | string;
        results: {
            created: string;
            id: number;
            user_id: IAccount;
            person_user_follows_id: IAccount;
        }[];
    }>(url);

    let accounts: IAccount[] = [];
    if (data) {
        console.log(data);
        accounts = [...data.results].map(
            ({ user_id, person_user_follows_id }) =>
                user_id || person_user_follows_id
        );
    }

    return (
        <section>
            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <p>error</p>
            ) : accounts.length > 0 ? (
                <Accounts users={accounts} dispatch={dispatchFollowAction} />
            ) : (
                <p>0 followers</p>
            )}
        </section>
    );
};

export default People;
