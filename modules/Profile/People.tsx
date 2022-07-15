import {
    FC,
    RefObject,
    useEffect,
    useRef,
    // useState,
} from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
// import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
// import { useSWRFetch } from "../../Hooks/useSwrFetch";
// import { HomeStory } from "../../interfaces";
import { IAccount } from "../../components/Accounts/Account";

import { Tabs } from "../../pages/profiles/[id]";
import { useSwrInfiniteScroll } from "../../Hooks/useSwrInfinite";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { returnUniqueArrayObject } from "../../utilities/returnUniqueArrayObject";

type IPeople = Pick<Tabs, "selected">;

// interface TPeople extends IPeople {}

interface NPeople {
    type: "following" | "followers";
    loadMoreRef: RefObject<HTMLDivElement>;
}

const People: FC<NPeople> = ({ type, loadMoreRef }) => {
    const { storyInstance } = useStoryRequest();

    let {
        dispatchProfile,
        profile: {
            main: { data: profile },
            [type]: { data: accounts, page, pages },
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
    }>(loadMoreRef, peopleUrl, storyInstance, page, pages);

    useEffect(() => {
        if (!totalData || loading) return;

        let data = totalData.map(
            ({ person_user_follows_id, user_id }) =>
                user_id || person_user_follows_id
        );

        data = returnUniqueArrayObject(data, "id") as IAccount[];

        dispatchProfile({
            type: "people_fetched",
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

    return (
        <section>
            {accounts.length > 0 ? (
                <Accounts users={accounts} dispatch={dispatchFollowAction} />
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
