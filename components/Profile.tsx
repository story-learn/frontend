import { FC } from "react";
import { Avatar } from "./../components";
import { IAvatar } from "./Avatar";
import { StyledProfile } from "./Styles/StyledProfile";

interface IProfile extends IAvatar {
    firstName: string;
    lastName: string;
    userName: string;
}

const Profile: FC<IProfile> = ({ firstName, lastName, userName, imgSrc }) => {
    let fullName = `${firstName} ${lastName}`.trim();

    if (!imgSrc) imgSrc = "/assests/jpgs/profile.jfif"; // default image

    return (
        <StyledProfile>
            <Avatar imgSrc={imgSrc} />

            <div className="profile__detail">
                <p className="profile__name">{fullName || "Testing Mode"}</p>
                <p className="profile__username">{userName}</p>
            </div>
        </StyledProfile>
    );
};

export default Profile;
