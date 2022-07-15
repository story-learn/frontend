import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
    ChangeEventHandler,
    FormEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    LoadingIndicator,
    Stories,
    ProtectRoute,
    InputSearch,
    InputRadio,
} from "../components";
import { StyledForm } from "../components/Form/FormStyles";
import { HandleFollowCreator } from "../components/Story/Stories";
import { StyledBookMarkPage } from "../components/Styles/StyledBookmarkPage";
import { StoryRoutes } from "../configs/story";
import { BASE_URLS } from "../Constants";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";
import { useSwrInfiniteScroll } from "../Hooks/useSwrInfinite";
import { HomeStory } from "../interfaces";
import { returnUniqueArrayObject } from "../utilities/returnUniqueArrayObject";
import useStoryRequest from "./../Hooks/useStoryRequest";

interface BookMarkResults {
    created: string;
    id: number;
    story: HomeStory;
    user_id: number;
}

interface Data {
    page: number;
    pages: number;
    bookmarks: HomeStory[];
}

const Bookmarks: NextPage = () => {
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { storyInstance } = useStoryRequest();
    const [search, setSearch] = useState<{
        current: string;
        prev: undefined | string;
        filter: string;
    }>({
        current: "",
        prev: undefined,
        filter: "",
    });
    const [storiesUrl, setStoriesUrl] = useState(``);
    const [data, setData] = useState<Data>({
        page: 1,
        pages: 1,
        bookmarks: [],
    });

    const handleSearchChange: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        let current = search.current.trim();
        let prev = search.prev?.trim();

        if (prev === current) return;
        setSearch((old) => ({ ...old, prev: current }));

        let { pathname, query, push } = router;
        current ? (query.search = current) : delete query.search;

        push({ pathname, query }, undefined, { shallow: true });
    };

    const handleFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch((prev) => ({ ...prev, filter: e.target.value }));

        const { prev } = search;

        const { pathname, query, push } = router;
        query.category = e.target.value;

        push({ pathname, query }, undefined, { shallow: true });
    };

    useEffect(() => {
        if (!router.isReady) return;
        const { query } = router;
        let { search: main, category: filter } = query;
        let url = new URL(`${BASE_URLS.Story}${StoryRoutes.BOOKMARK_STORY}`);

        if (main) {
            url.searchParams.append("search", main as string);
        }

        if (filter) {
            url.searchParams.append("category", filter as string);
        }

        setSearch((old) => ({
            prev: main as string | undefined,
            current: "",
            filter: filter as string,
        }));

        setStoriesUrl(url.href);
    }, [router]);

    // let { totalData, loading, error, currentPage, totalPages } =
    //     useInfiniteScroll<BookMarkResults[]>(
    //         storiesUrl,
    //         storyInstance,
    //         data.page,
    //         data.pages
    //     );

    let {
        loading,
        error,
        results: totalData,
        page: currentPage,
        pages: totalPages,
    } = useSwrInfiniteScroll<BookMarkResults>(
        loadMoreRef,
        storiesUrl,
        storyInstance,
        data.page,
        data.pages
    );

    useEffect(() => {
        if (loading || error || !totalData) return;

        let bookmarks = (
            returnUniqueArrayObject(
                totalData as any[],
                "id"
            ) as BookMarkResults[]
        ).map(({ story }) => story) as HomeStory[];
        setData((prev) => ({ ...prev, bookmarks }));
    }, [totalData, loading, error, currentPage, totalPages]);

    const handleFollowCreator: HandleFollowCreator = (
        following_story_creator,
        creatorId
    ) => {
        let bookmarks = [...data.bookmarks];

        bookmarks.forEach((story) => {
            if (story.user.id === creatorId) {
                story.following_story_creator = !following_story_creator;
            }
        });

        setData((prev) => ({ ...prev, bookmarks }));
    };

    const handleLikeStory = (storyId: number, userLikedStory: boolean) => {
        let bookmarks = data.bookmarks.map((story) => {
            if (story.id === storyId) {
                story = {
                    ...story,
                    user_liked_story: !userLikedStory,
                    likes: userLikedStory ? story.likes - 1 : story.likes + 1,
                };
            }
            return story;
        });
        setData((prev) => ({ ...prev, bookmarks }));
    };

    const handleBookmarkStory = (storyId: number, bookmarked: boolean) => {
        // let bookmarks = ([...data.bookmarks] as HomeStory[]).map((story) => {
        //     if (story.id === storyId) {
        //         story.user_bookmarked_story = bookmarked;
        //     }

        //     return story;
        // });

        let bookmarks = ([...data.bookmarks] as HomeStory[]).filter(
            ({ id }) => id !== storyId
        );

        setData((prev) => ({ ...prev, bookmarks: bookmarks }));
    };

    return (
        <>
            <Head>
                <title>Bookmarks</title>
            </Head>
            <StyledBookMarkPage>
                <header className="bookmark__header">
                    <h1>Bookmarks</h1>
                </header>
                <div className="bookmark__cont">
                    <StyledForm
                        onSubmit={handleSearchChange}
                        className="bookmark__form"
                        role="search"
                        aria-label="Search for bookmarks"
                    >
                        <InputSearch
                            handleChange={(e) => {
                                setSearch((old) => ({
                                    ...old,
                                    current: e.target.value,
                                }));
                            }}
                            value={search.current}
                            placeholder="Search for bookmarks..."
                        />
                        <div className="form__filter">
                            <p className="form__filter--para">by</p>

                            <InputRadio
                                id="username"
                                handleChange={handleFilter}
                                value="username"
                                name="filter"
                                label="users"
                                disabled={search.prev === undefined}
                                cheked={search.filter === "username"}
                            />
                            <InputRadio
                                id="stories"
                                handleChange={handleFilter}
                                value="story"
                                name="filter"
                                label="stories"
                                disabled={search.prev === undefined}
                                cheked={search.filter === "story"}
                            />
                        </div>
                    </StyledForm>
                    <div>
                        <Stories
                            stories={data.bookmarks}
                            handleFollowCreator={handleFollowCreator}
                            handleLikeStory={handleLikeStory}
                            handleBookmarkStory={handleBookmarkStory}
                        />
                        {loading ? (
                            <LoadingIndicator />
                        ) : error ? (
                            <p>Error loading stories</p>
                        ) : null}
                    </div>
                </div>
                <div
                    ref={loadMoreRef}
                    aria-hidden
                    style={{
                        width: "100%",
                        height: "0.1rem",
                    }}
                ></div>
            </StyledBookMarkPage>
        </>
    );
};

export default ProtectRoute(Bookmarks);
