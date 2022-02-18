import { FC } from "react";
import Image from "next/image";
import { StyledAvatar } from "./Styles/StyledAvatar";

export interface IAvatar {
    imgSrc: string;
}

const Avatar: FC<IAvatar> = ({ imgSrc }) => {
    return (
        <StyledAvatar>
            <Image
                src={imgSrc}
                width={20}
                height={20}
                alt=""
                layout="responsive"
            />
        </StyledAvatar>
    );
};

export default Avatar;
