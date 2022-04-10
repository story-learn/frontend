import Image from "next/image";
import { FC } from "react";
import { Profile } from "../../interfaces";

type PImage = Pick<Profile, "profile_picture">;

interface IImage extends PImage {}

const ProfileImage: FC<IImage> = ({ profile_picture }) => {
    if (!profile_picture) profile_picture = "/assests/jpgs/profile.jfif";

    return (
        <figure className="profile__header--avatar">
            <Image
                src={profile_picture as string}
                alt=""
                width={200}
                height={200}
                layout="responsive"
            />
        </figure>
    );
};

export default ProfileImage;
