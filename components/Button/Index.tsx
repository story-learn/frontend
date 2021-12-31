import { FC } from "react";
import { LoadingIndicator } from "../../components";
import { StyledButton } from "./ButtonStyle";

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    text?: string | number;
    processing?: boolean;
    disabled?: boolean;
    variant?: "outline" | "no-border";
    className?: string;
}

const Index: FC<ButtonProps> = ({
    type,
    text,
    processing,
    disabled,
    variant,
    className,
}) => {
    return (
        <StyledButton
            type={type}
            disabled={disabled}
            variant={variant}
            className={className}
        >
            {processing ? <LoadingIndicator /> : text}
        </StyledButton>
    );
};

export default Index;
