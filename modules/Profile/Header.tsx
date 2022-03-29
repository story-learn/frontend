import React, { FC } from "react";
import { Button } from "../../components";
import { Profile } from "../../interfaces";
import { ProfileImage } from "./index";

type PHeader = Pick<Profile, "profile_picture">;

interface IHeader extends PHeader {}

const Header: FC<IHeader> = ({ profile_picture }) => {
    return (
        <header className="flex profile__header">
            <div className="profile__header--div-1 flex">
                <ProfileImage profile_picture={profile_picture} />
                <div className="profile__header--div-2">
                    <h2 className="profile__header--name">Steph Crown</h2>
                    <p className="profile__header--username">@stephcrown06</p>
                    <Button text="Follow" className="profile__header--follow" />
                </div>
            </div>
            <p className="profile__header--bio">
                Student of University of Lagos | Mathematics. Lover of football
                and hater of Manchester United
            </p>
        </header>
    );
};

export default Header;
