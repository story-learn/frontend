import { FC, MouseEventHandler, useState } from "react";
import { Button } from "../../components";
import { BASE_URLS } from "../../Constants";
import { useAuth } from "../../context/AuthContext";
import { useProfileContext } from "../../context/pages/Profile";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { ProfileImage } from "./index";

const Header: FC = () => {
    const { user } = useAuth();
    const { storyInstance } = useStoryRequest();
    const {
        profile: { main },
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
        followers.findIndex(({ user_id }) => user_id === user.user_id) === -1
            ? "Follow"
            : "Unfollow"
    );
    // console.log({ followers });

    const userIsLoggedIn = Boolean(user);
    let fullName = `${first_name} ${last_name}`;

    const showFollowButton = userIsLoggedIn && profileId !== user.user_id;

    const handleFollow: MouseEventHandler<HTMLButtonElement> = async (e) => {
        let currentFollowText = followBtnText;

        let unFollowUrl = `${BASE_URLS.Story}/userprofile/follow/${profileId}/`;
        let followUrl = `${BASE_URLS.Story}/userprofile/follow/`;

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
            followBtnText === "Unfollow"
                ? await storyInstance.delete(unFollowUrl)
                : await storyInstance.post(followUrl, {
                      person_user_follows_id: profileId,
                  });
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

    return (
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
        </header>
    );
};

export default Header;
