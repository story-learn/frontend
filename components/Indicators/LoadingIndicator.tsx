import { FC } from "react";
import { StyledLoading } from "./LoadingStyles";

interface IProps {
    className?: string;
}

const LoadingIndicator: FC<IProps> = ({ className }) => {
    return (
        <StyledLoading className={className}>
            <span></span>
            <span></span>
        </StyledLoading>
    );
};

export default LoadingIndicator;
