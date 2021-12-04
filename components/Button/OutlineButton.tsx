import { FC } from "react";
import { Button } from "../../components";
import { ButtonProps } from "./Index";

type OutlineButtonProps = Omit<ButtonProps, "variant">;

const OutlineButton: FC<OutlineButtonProps> = ({
    type,
    text,
    processing,
    disabled,
}) => {
    return (
        <Button
            type={type}
            text={text}
            disabled={disabled}
            processing={processing}
            variant="outline"
        />
    );
};

export default OutlineButton;
