import { NextPage } from "next";
import { StoryRoutes } from "../configs/story";
import { BASE_URLS } from "../Constants";
import { useRef, useState } from "react";
import { useSwrInfiniteScroll } from "../Hooks/useSwrInfinite";
import { InfiniteComponent, LoadingIndicator, Stories } from "../components";
import { HomeStory } from "../interfaces";

interface Stories {
    page: number;
    totalPages: number;
    data: any[] | null;
}

interface FetchedResult {
    num_of_pages: number;
    object_count: number;
    previous: null | string;
    results: any[];
}

const Checkers: NextPage = () => {
    const loadRef = useRef<HTMLDivElement>(null);
    const [stories, setStories] = useState<Stories>({
        page: 1,
        totalPages: 1,
        data: null,
    });

    let storiesUrl = `${BASE_URLS.Story}${StoryRoutes.GET_STORIES}`;

    let { results, error, isValidating, loading, page, pages } =
        useSwrInfiniteScroll<HomeStory>(
            loadRef,
            storiesUrl,
            undefined,
            stories.page,
            stories.totalPages
        );
    // console.log(result);

    return (
        <>
            <InfiniteComponent loading={loading} error={error} ref={loadRef}>
                <Stories
                    stories={results || []}
                    handleFollowCreator={() => {}}
                    handleLikeStory={() => {}}
                    handleBookmarkStory={() => {}}
                />
                {/* <div ref={loadRef}></div> */}
                {/* {loading && <LoadingIndicator />} */}
                {/* {error && <p>Error loading stories</p>} */}
            </InfiniteComponent>
        </>
    );
};

export default Checkers;
