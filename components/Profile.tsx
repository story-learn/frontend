import { FC } from "react";
import { Avatar } from "./../components";
import { StyledProfile } from "./Styles/StyledProfile";

const Profile: FC = () => {
    return (
        <StyledProfile>
            <Avatar />
            <div className="profile__detail">
                <p className="profile__name">Name Name</p>
                <p className="profile__username">username</p>
            </div>
        </StyledProfile>
    );
};

export default Profile;
