import { FC } from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { HomeStory } from "../../interfaces";

import { Tabs } from "../../pages/profiles/[id]";

type IPeople = Pick<Tabs, "selected">;

interface TPeople extends IPeople {}

const People: FC<TPeople> = ({ selected }) => {
    let storiesUrl =
        selected === "Followers"
            ? `${BASE_URLS.Story}${StoryRoutes.GET_USERS}`
            : `${BASE_URLS.Story}${StoryRoutes.GET_USERS}`;

    storiesUrl += `/?search=Acel`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<HomeStory[]>(storiesUrl);

    return (
        <section>
            {totalData.length > 0 ? (
                <Accounts users={totalData} className="search__profiles" />
            ) : totalData.length === 0 && !loading ? (
                <p>
                    {selected === "Followers"
                        ? "No followers"
                        : "Not Following anyone"}
                </p>
            ) : null}
            {loading && <LoadingIndicator />}
            {error && <p>There is an error...</p>}
        </section>
    );
};

export default People;
