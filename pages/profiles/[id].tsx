import { NextPage } from "next";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
    let router = useRouter();
    console.log(router);

    return (
        <>
            <main>Profile</main>
        </>
    );
};

export default Profile;
