import { useRouter } from "next/router";
import { ElementType, FC, MouseEventHandler } from "react";
import { Avatar, Button } from "./../components";
import { IAvatar } from "./Avatar";
import { StyledProfile } from "./Styles/StyledProfile";

// export interface IProfile extends IAvatar {
//     id: number;
//     firstName: string;
//     lastName: string;
//     userName: string;
//     bio?: string;
//     // followers?: string;
//     // followers_count?: { created: string; id: number; user_id: number }[];
//     followers?: { created: string; id: number; user_id: number }[];
//     followers_count?: string;
//     onFollow?: MouseEventHandler<HTMLButtonElement>;
//     as?: ElementType;
//     profileClassName?: string;
// }

export interface IProfile extends IAvatar {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    bio?: string;
    followers?: { created: string; id: number; user_id: number }[];
    followers_count?: string;
    onFollow?: MouseEventHandler<HTMLButtonElement>;
    showFollowBtn?: boolean;
    followBtnText?: "Follow" | "Unfollow";
    as?: ElementType;
    profileClassName?: string;
}

const Profile: FC<IProfile> = ({
    id,
    first_name,
    last_name,
    username,
    imgSrc,
    bio,
    followers,
    followers_count,
    onFollow,
    as,
    profileClassName = "",
    showFollowBtn = false,
    followBtnText = "Follow",
}) => {
    const { push } = useRouter();
    let fullName = `${first_name} ${last_name}`.trim();

    if (!imgSrc) imgSrc = "/assests/jpgs/profile.jfif"; // default image

    const handleGoToProfile: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        push(`/profiles/${id}`);
    };

    return (
        <StyledProfile as={as} className={profileClassName}>
            <Avatar imgSrc={imgSrc} className="profile__avatar" />

            <div className="profile__detail">
                <button className="profile__name" onClick={handleGoToProfile}>
                    {fullName || "Testing Mode"}
                </button>
                <div className="profile__userFollow">
                    <p className="profile__username">{username}</p>
                    {followers && (
                        <p className="profile__followers">
                            {followers_count} followers
                        </p>
                    )}
                </div>
                {bio && <p className="profile__bio truncate">{bio}</p>}
            </div>
            {/* {onFollow && (
                <Button
                    text="Follow"
                    type="button"
                    variant="outline"
                    onClick={onFollow}
                    className="profile__follow"
                />
            )} */}
            {showFollowBtn && (
                <Button
                    text={followBtnText}
                    type="button"
                    variant="outline"
                    onClick={onFollow}
                    className="profile__follow"
                />
            )}
        </StyledProfile>
    );
};

export default Profile;
