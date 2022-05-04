import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CustomLink, LoadingIndicator, Modal, Stories } from "../components";
import { HeadTag } from "../components/head";
import { HandleFollowCreator } from "../components/Story/Stories";
import { BASE_URLS } from "../Constants";
import { useAuth } from "../context/AuthContext";
import { useStories } from "../context/StoriesContext";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";
import useStoryRequest from "../Hooks/useStoryRequest";
import { HomeStory } from "../interfaces";
import { StoryRoutes } from "./../configs/story";

const Home: NextPage = () => {
    const { user, authenticating } = useAuth();
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
    let storiesUrl = authenticating
        ? false
        : `${BASE_URLS.Story}${StoryRoutes.GET_STORIES}`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<HomeStory[]>(
            storiesUrl,
            Boolean(user) ? storyInstance : undefined,
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

    return (
        <>
            <HeadTag title="Storylearn - Home" />
            <main>
                <Stories
                    stories={stories}
                    handleFollowCreator={handleFollowCreator}
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
