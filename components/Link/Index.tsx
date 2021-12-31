import { StyledButton } from "../Button/ButtonStyle";
import Link from "next/link";
import { FC } from "react";
import { ButtonProps } from "../Button/Index";

type IProps = Pick<ButtonProps, "text" | "variant" | "className">;

interface ILink extends IProps {
    href: string;
}

const CustomLink: FC<ILink> = ({ text, href, variant, className }) => {
    return (
        <Link href={href} passHref>
            <StyledButton as="a" className={className} variant={variant}>
                {text}
            </StyledButton>
        </Link>
    );
};

export default CustomLink;
