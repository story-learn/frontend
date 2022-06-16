import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { LoadingIndicator, Stories, ProtectRoute } from "../components";
import { HandleFollowCreator } from "../components/Story/Stories";
import { StoryRoutes } from "../configs/story";
import { BASE_URLS } from "../Constants";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";
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
    const { storyInstance } = useStoryRequest();
    let storiesUrl = `${BASE_URLS.Story}${StoryRoutes.BOOKMARK_STORY}`;
    const [data, setData] = useState<Data>({
        page: 1,
        pages: 1,
        bookmarks: [],
    });

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<BookMarkResults[]>(
            storiesUrl,
            storyInstance,
            data.page,
            data.pages
        );

    useEffect(() => {
        if (loading || error) return;

        let bookmarks = (
            returnUniqueArrayObject(totalData, "id") as BookMarkResults[]
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
        let bookmarks = ([...data.bookmarks] as HomeStory[]).map((story) => {
            if (story.id === storyId) {
                story.user_bookmarked_story = bookmarked;
            }

            return story;
        });

        setData((prev) => ({ ...prev, bookmarks: bookmarks }));
    };

    return (
        <>
            <Head>
                <title>Bookmarks</title>
            </Head>
            <main>
                <Stories
                    stories={data.bookmarks}
                    handleFollowCreator={handleFollowCreator}
                    handleLikeStory={handleLikeStory}
                    handleBookmarkStory={handleBookmarkStory}
                />
                {loading && <LoadingIndicator />}
                {error && <p>Error loading stories</p>}
            </main>
        </>
    );
};

export default ProtectRoute(Bookmarks);
