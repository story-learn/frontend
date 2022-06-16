import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CustomLink, LoadingIndicator, Modal, Stories } from "../components";
import { HeadTag } from "../components/head";
import { HandleFollowCreator } from "../components/Story/Stories";
import { BASE_URLS } from "../Constants";
// import { useAuth } from "../context/AuthContext";
import { useStories } from "../context/StoriesContext";
import { useAuth } from "../Hooks/useAuth";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";
import useStoryRequest from "../Hooks/useStoryRequest";
import { HomeStory } from "../interfaces";
import { StoryRoutes } from "./../configs/story";

const Home: NextPage = () => {
    const { user } = useAuth();
    const { storyInstance } = useStoryRequest();

    const [promptUserToLogin, setPromptUserToLogin] = useState(false);

    let {
        stories: {
            data: stories,
            currentPage: storiesPage,
            totalPages: totalStoriesPages,
        },
        dispatchStories,
    } = useStories();

    // wait for authenticated status before calling hook. This is to prevent the useInfiniteScroll hook from calling the API before knowing if the user is authenticated.
    let storiesUrl = `${BASE_URLS.Story}${StoryRoutes.GET_STORIES}`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<HomeStory[]>(
            storiesUrl,
            storyInstance,
            storiesPage,
            totalStoriesPages
        );

    useEffect(() => {
        if (!totalData) return;

        dispatchStories({
            type: "fetch_stories",
            payload: { stories: totalData, currentPage, totalPages },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalData]);

    useEffect(() => {
        let promptId = setTimeout(() => {
            let userIsLoggedIn = Boolean(user);
            setPromptUserToLogin(!userIsLoggedIn);
        }, 120_000);

        return () => {
            clearTimeout(promptId);
        };
    }, [user]);

    const handleFollowCreator: HandleFollowCreator = (
        following_story_creator,
        creatorId
    ) => {
        dispatchStories({
            type: "story_creator_followed_action",
            payload: {
                creatorId,
                following_story_creator: !following_story_creator,
            },
        });
    };

    const handleLikeStory = (storyId: number, userLikedStory: boolean) => {
        dispatchStories({
            type: "story_liked_or_unliked",
            payload: { storyId, userLikedStory },
        });
    };

    const handleBookmarkStory = (storyId: number, bookmarked: boolean) => {
        dispatchStories({
            type: "story_bookmarked_or_unbookmarked",
            payload: { storyId, bookmarked },
        });
    };

    return (
        <>
            <HeadTag title="Storylearn - Home" />
            <main>
                <Stories
                    stories={stories}
                    handleFollowCreator={handleFollowCreator}
                    handleLikeStory={handleLikeStory}
                    handleBookmarkStory={handleBookmarkStory}
                />
                {loading && <LoadingIndicator />}
                {error && <p>Error loading stories</p>}
            </main>
            <Modal
                showModal={promptUserToLogin}
                title="Get the full experience when you log in"
                extraClassName="modalAuth"
            >
                <p>
                    Follow your favorite accounts, read stories that have been
                    posted, save stories, and make your own.
                </p>
                <div className="modalAuth__links">
                    <CustomLink href="/signin" text="Log In" />
                    <CustomLink
                        href="/signup"
                        text="Sign Up"
                        variant="no-border"
                    />
                </div>
            </Modal>
        </>
    );
};

export default Home;
