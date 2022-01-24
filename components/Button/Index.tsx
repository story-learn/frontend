import { FC, MouseEventHandler } from "react";
import { LoadingIndicator } from "../../components";
import { StyledButton } from "./ButtonStyle";

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    text?: string | number;
    processing?: boolean;
    disabled?: boolean;
    variant?: "outline" | "no-border";
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Index: FC<ButtonProps> = ({
    type,
    text,
    processing,
    disabled,
    variant,
    onClick,
    className,
}) => {
    return (
        <StyledButton
            type={type}
            disabled={disabled}
            variant={variant}
            className={className}
            onClick={onClick}
        >
            {processing ? <LoadingIndicator /> : text}
        </StyledButton>
    );
};

export default Index;
