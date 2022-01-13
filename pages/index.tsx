import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CustomLink, Modal } from "../components";
import { HeadTag } from "../components/head";
import { useAuth } from "../context/AuthContext";

const Home: NextPage = () => {
    const { user } = useAuth();
    const [promptUserToLogin, setPromptUserToLogin] = useState(false);

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
            <main></main>
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
