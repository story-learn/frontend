import { useRouter } from "next/router";
import { ElementType, FC, MouseEventHandler } from "react";
import { Avatar, Button } from "./../components";
import { IAvatar } from "./Avatar";
import { StyledProfile } from "./Styles/StyledProfile";

export interface IProfile extends IAvatar {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    bio?: string;
    followers?: string;
    onFollow?: MouseEventHandler<HTMLButtonElement>;
    as?: ElementType;
    profileClassName?: string;
}

const Profile: FC<IProfile> = ({
    id,
    firstName,
    lastName,
    userName,
    imgSrc,
    bio,
    followers,
    onFollow,
    as,
    profileClassName = "",
}) => {
    const { push } = useRouter();
    let fullName = `${firstName} ${lastName}`.trim();

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
                    <p className="profile__username">{userName}</p>
                    {followers && (
                        <p className="profile__followers">
                            {followers} followers
                        </p>
                    )}
                </div>
                {bio && <p className="profile__bio truncate">{bio}</p>}
            </div>
            {onFollow && (
                <Button
                    text="Follow"
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
