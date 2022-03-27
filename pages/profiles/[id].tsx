import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfile } from "../../Hooks/useProfile";

const Profile: NextPage = () => {
    let { query } = useRouter();

    useEffect(() => {
        fetch(`${BASE_URLS.Story}${StoryRoutes.GET_PROFILE}/${1}`)
            .then((res) => res.json())
            .then(console.log)
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <>
            <main>Profile</main>
        </>
    );
};

export default Profile;
