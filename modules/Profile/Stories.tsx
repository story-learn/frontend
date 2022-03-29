import { FC } from "react";
import { LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { HomeStory } from "../../interfaces";
import { Stories as StoriesComponent } from "../../components";
import { Tabs } from "../../pages/profiles/[id]";

type IStories = Pick<Tabs, "selected">;

interface Stories extends IStories {}

const Stories: FC<Stories> = ({ selected }) => {
    let storiesUrl =
        selected === "Stories"
            ? `${BASE_URLS.Story}${StoryRoutes.GET_STORIES}`
            : `${BASE_URLS.Story}${StoryRoutes.GET_STORIES}`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<HomeStory[]>(storiesUrl);

    return (
        <section className="profile__stories">
            {totalData.length > 0 ? (
                <StoriesComponent stories={totalData} />
            ) : totalData.length === 0 && !loading ? (
                <p>No Stories</p>
            ) : null}
            {loading && <LoadingIndicator />}
            {error && <p>There is an error...</p>}
        </section>
    );
};

export default Stories;
