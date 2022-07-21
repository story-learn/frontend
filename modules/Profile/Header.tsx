import { useRouter } from "next/router";
import { FC, MouseEventHandler, useState } from "react";
import { Button } from "../../components";
// import { useAuth } from "../../context/AuthContext";
import { useProfileContext } from "../../context/pages/Profile";
import { useAuth } from "../../Hooks/useAuth";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { followProfile, unFollowProfile } from "../../utilities/Profile";
import { ProfileImage, EditProfileModal } from "./index";

const Header: FC = () => {
    const { user } = useAuth();
    const { storyInstance } = useStoryRequest();
    const { query } = useRouter();
    const {
        profile: {
            main,
            tabs: { lists },
        },
        dispatchProfile,
    } = useProfileContext();

    let {
        first_name,
        last_name,
        profile_picture,
        username,
        bio,
        id: profileId,
        followers,
        followers_count,
    } = main.data!;

    const [followBtnText, setFollowBtnText] = useState(
        followers.findIndex(({ user_id }) => user_id === user?.user_id) === -1
            ? "Follow"
            : "Unfollow"
    );
    // console.log({ followers });

    const userIsLoggedIn = Boolean(user);
    let fullName = `${first_name} ${last_name}`;

    const showFollowButton = userIsLoggedIn && profileId !== user?.user_id;

    const handleFollow: MouseEventHandler<HTMLButtonElement> = async (e) => {
        let currentFollowText = followBtnText;

        let newFollowersCount =
            currentFollowText === "Follow"
                ? followers_count + 1
                : followers_count - 1;

        setFollowBtnText((prev) => (prev === "Follow" ? "Unfollow" : "Follow")); // update UI immediately
        // update context
        dispatchProfile({
            type: "profile_main",
            payload: {
                data: { ...main.data!, followers_count: newFollowersCount },
                error: main.error,
                loading: main.loading,
            },
        });
        try {
            // storyInstance will be available because the button for this action is only rendered if the user is logged in
            followBtnText === "Unfollow"
                ? await unFollowProfile(storyInstance, profileId)
                : await followProfile(storyInstance, profileId);
        } catch (error) {
            console.log("there was error");
            // console.log(error);
            setFollowBtnText(currentFollowText); // revert UI if there was an error
            // revert context
            dispatchProfile({
                type: "profile_main",
                payload: {
                    data: { ...main.data!, followers_count },
                    error: main.error,
                    loading: main.loading,
                },
            });
        }
    };

    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    return (
        <>
            <header className="flex profile__header">
                <div className="profile__header--div-1 flex">
                    <ProfileImage profile_picture={profile_picture} />
                    <div className="profile__header--div-2">
                        <h2 className="profile__header--name">{fullName}</h2>
                        <p className="profile__header--username">@{username}</p>

                        {showFollowButton && (
                            <Button
                                text={followBtnText}
                                className="profile__header--follow"
                                onClick={handleFollow}
                            />
                        )}
                    </div>
                </div>
                <p className="profile__header--bio">{bio ? bio : "No bio"}</p>
                {query?.id === "me" && (
                    <Button
                        text="Edit"
                        className="profile__header--edit"
                        onClick={() => setShowEditProfileModal(true)}
                    />
                )}
            </header>
            <EditProfileModal
                showModal={showEditProfileModal}
                closeModal={() => setShowEditProfileModal(false)}
                // data={{ profile_picture, username, bio, first_name, last_name }}
            />
        </>
    );
};

export default Header;
