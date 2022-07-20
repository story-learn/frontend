import { FC, RefObject, useEffect, useRef } from "react";
import { Accounts, LoadingIndicator, Notification } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
import { IAccount } from "../../components/Accounts/Account";

import { Tabs } from "../../pages/profiles/[id]";
import { useSwrInfiniteScroll } from "../../Hooks/useSwrInfinite";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { returnUniqueArrayObject } from "../../utilities/returnUniqueArrayObject";
import { useRouter } from "next/router";
import { useAuth } from "../../Hooks/useAuth";

type IPeople = Pick<Tabs, "selected">;

// interface TPeople extends IPeople {}

interface NPeople {
    type: "following" | "followers";
    loadMoreRef: RefObject<HTMLDivElement>;
}

const People: FC<NPeople> = ({ type, loadMoreRef }) => {
    const { storyInstance } = useStoryRequest();
    const { query } = useRouter();
    const { user } = useAuth();

    let {
        dispatchProfile,
        profile: {
            main: { data: profile },
            [type]: { data: accounts, page, pages },
            tabs: { lists },
        },
    } = useProfileContext()!;

    let { id } = profile!;

    let peopleUrl = `${BASE_URLS.Story}${
        type === "followers"
            ? StoryRoutes.GET_FOLLOWERS
            : StoryRoutes.GET_FOLLOWING
    }/?user_id=${id}`;

    let {
        loading,
        error,
        results: totalData,
        page: currentPage,
        pages: totalPages,
    } = useSwrInfiniteScroll<{
        user_id: IAccount;
        person_user_follows_id: IAccount;
    }>(loadMoreRef, peopleUrl, storyInstance, page, pages, {
        revalidateOnMount: true,
    });

    useEffect(() => {
        if (!totalData || loading) return;

        let data = totalData.map(
            ({ person_user_follows_id, user_id }) =>
                user_id || person_user_follows_id
        );

        data = returnUniqueArrayObject(data, "id") as IAccount[];

        dispatchProfile({
            type: "profile_tab_data_fetched",
            payload: {
                data,
                page: currentPage,
                pages: totalPages,
                type,
            },
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalData]);

    const dispatchFollowAction = (status: "failed" | undefined) => {};

    const handleOnFollow: IAccount["handleOnFollow"] = (followId, action) => {
        if (query.id !== "me") return;

        let followingValue = lists[3].value || 0;
        let value =
            action === "Follow" ? followingValue + 1 : followingValue - 1;
        if (type === "following") {
            console.log({ type });
            let data = [...accounts].filter(
                (account) => account.id !== followId
            );
            dispatchProfile({
                type: "profile_tab_data_updated",
                payload: {
                    data,
                    type,
                },
            });
        }
        if (type === "followers") {
            let account = accounts.find((account) => account.id === followId);
            if (account) {
                if (action === "Follow") {
                    (account.followers || []).push({
                        created: "dummy_date",
                        id,
                        user_id: id,
                    });
                } else {
                    account.followers = [...(account.followers || [])].filter(
                        ({ user_id }) => user_id !== id
                    );
                }
            }
            dispatchProfile({
                type: "profile_tab_data_updated",
                payload: {
                    data: accounts,
                    type,
                },
            });
        }
        dispatchProfile({
            type: "profile_update_tab_data_count",
            payload: {
                tab: "Following",
                value,
            },
        });

        return;
    };

    return (
        <section>
            {accounts.length > 0 ? (
                <Accounts
                    users={accounts}
                    dispatch={dispatchFollowAction}
                    handleFollow={handleOnFollow}
                />
            ) : accounts.length === 0 && !loading && !error ? (
                <p>0 {type}</p>
            ) : null}
            {loading ? <LoadingIndicator /> : error ? <p>error</p> : null}

            <div
                ref={loadMoreRef}
                aria-hidden
                style={{
                    width: "100%",
                    height: "0.1rem",
                }}
            ></div>
        </section>
    );
};

export default People;
