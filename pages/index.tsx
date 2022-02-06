import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CustomLink, LoadingIndicator, Modal, Stories } from "../components";
import { HeadTag } from "../components/head";
import { BASE_URLS } from "../Constants";
import { useAuth } from "../context/AuthContext";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";
import { HomeStory } from "../interfaces";
import { StoryRoutes } from "./../configs/story";

const Home: NextPage = () => {
    const { user } = useAuth();
    const [promptUserToLogin, setPromptUserToLogin] = useState(false);
    const [storyPage, setStoryPage] = useState(0);
    let storiesUrl = `${BASE_URLS.Story}${StoryRoutes.GET_STORIES}`;

    let {
        totalData: stories,
        loading,
        error,
    } = useInfiniteScroll<HomeStory[]>(storiesUrl, storyPage);

    if (!stories) stories = [];

    //    console.log("total data...", stories);

    useEffect(() => {
        let promptId = setTimeout(() => {
            let userIsLoggedIn = Boolean(user);
            setPromptUserToLogin(!userIsLoggedIn);
        }, 120_000);

        return () => {
            clearTimeout(promptId);
        };
    }, [user]);

    return (
        <>
            <HeadTag title="Storylearn - Home" />
            <main>
                <Stories stories={stories} />
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
