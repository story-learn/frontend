import type { NextPage } from "next";
import { useState } from "react";
import { Modal } from "../components";
import { HeadTag } from "../components/head";

const Home: NextPage = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <HeadTag title="Storylearn - Home" />
            <main>
                <header>
                    <h1>STORY</h1>
                </header>
                <section>
                    <button onClick={() => setShowModal((prev) => !prev)}>
                        Toggle Modal
                    </button>
                </section>
                <Modal
                    showModal={showModal}
                    closeModal={() => {
                        setShowModal(false);
                    }}
                />
            </main>
        </>
    );
};

export default Home;
