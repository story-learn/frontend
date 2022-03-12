import { FC } from "react";
import Image from "next/image";
import { StyledAvatar } from "./Styles/StyledAvatar";

export interface IAvatar {
    imgSrc: string;
    className?: string;
}

const Avatar: FC<IAvatar> = ({ imgSrc, className = "" }) => {
    return (
        <StyledAvatar className={className}>
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
