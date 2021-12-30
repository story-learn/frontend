import { FC } from "react";
// import { AiOutlineClose } from "react-icons/ai";
import { ErrorIcon, InfoIcon, SuccessIcon } from "../SVGs";
import { StyledNotification } from "./StyledNotification";

type Type = "info" | "success" | "error";

interface Props {
    type: Type;
    title?: string;
    shortText?: string;
}

const IconType = {
    "info": <InfoIcon />,
    "success": <SuccessIcon />,
    "error": <ErrorIcon />,
};

const Notification: FC<Props> = ({ type, title, shortText, children }) => {
    return (
        <StyledNotification className={`notification notification__${type}`}>
            <figure className="notification__icon">{IconType[type]}</figure>
            <div className="notification__content">
                {title && (
                    <h4 className="notification__content-header">{title}</h4>
                )}
                {shortText && (
                    <p className="notification__content-short">{shortText}</p>
                )}
                {children}
            </div>
            {/* <button className="notification__close">
                <figure className="notification__close-fig">
                    <AiOutlineClose />
                </figure>
            </button> */}
        </StyledNotification>
    );
};

export default Notification;
