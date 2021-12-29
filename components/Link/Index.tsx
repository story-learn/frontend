import { StyledButton } from "../Button/ButtonStyle";
import Link from "next/link";
import { FC } from "react";

interface ILink {
    text: string;
    className?: string;
}

const CustomLink: FC<ILink> = ({ text, className }) => {
    return (
        <Link href={"/signin"} passHref>
            <StyledButton as="a" className={className}>
                {text}
            </StyledButton>
        </Link>
    );
};

export default CustomLink;
