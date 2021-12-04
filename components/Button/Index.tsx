import { FC } from "react";
import { LoadingIndicator } from "../../components";
import { StyledButton } from "./ButtonStyle";

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    text?: string | number;
    processing?: boolean;
    disabled?: boolean;
    variant?: "outline";
}

const Index: FC<ButtonProps> = ({
    type,
    text,
    processing,
    disabled,
    variant,
}) => {
    return (
        <StyledButton type={type} disabled={disabled} variant={variant}>
            {processing ? <LoadingIndicator /> : text}
        </StyledButton>
    );
};

export default Index;
