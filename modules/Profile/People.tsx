import { FC, useState } from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { HomeStory } from "../../interfaces";

import { Tabs } from "../../pages/profiles/[id]";

type IPeople = Pick<Tabs, "selected">;

interface TPeople extends IPeople {}

// const People: FC<TPeople> = ({ selected }) => {
const People: FC = () => {
    let {
        profile: {
            tabs: { selected },
        },
        // dispatchProfile,
    } = useProfileContext()!;

    let peopleUrl =
        selected === "Followers"
            ? `${BASE_URLS.Story}${StoryRoutes.GET_FOLLOWERS}`
            : `${BASE_URLS.Story}${StoryRoutes.GET_FOLLOWING}`;

    // storiesUrl += `/?search=Acel`;
    // // const [page, setPage] = useState(1)

    // let { totalData, loading, error, currentPage, totalPages } =
    //     useInfiniteScroll<HomeStory[]>(peopleUrl);
    // console.log(totalData);

    console.log("profile page");
    console.log({ peopleUrl });

    return (
        <section>
            {selected} page
            {/* {totalData.length > 0 ? (
                <Accounts users={totalData} className="search__profiles" />
            ) : totalData.length === 0 && !loading ? (
                <p>
                    {selected === "Followers"
                        ? "No followers"
                        : "Not Following anyone"}
                </p>
            ) : null}
            {loading && <LoadingIndicator />}
            {error && <p>There is an error...</p>} */}
        </section>
    );
};

export default People;
