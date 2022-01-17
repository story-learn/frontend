import { FC } from "react";
import Image from "next/image";
import { StyledAvatar } from "./Styles/StyledAvatar";
// import BgPic from "./../public/assests/jpgs/profile.jfif";

const Avatar: FC = () => {
    return (
        <StyledAvatar>
            <Image
                // src="/public/assests/jpgs/profile.jfif"
                src="/assests/jpgs/profile.jfif"
                width={20}
                height={20}
                alt=""
                layout="responsive"
            />
        </StyledAvatar>
    );
};

export default Avatar;
