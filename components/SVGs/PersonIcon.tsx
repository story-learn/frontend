import { FC } from "react";
import { IconTypes } from "../../interfaces/types";

const PersonIcon: FC<IconTypes> = ({ color }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5293 4.86071C11.5293 6.81873 9.95935 8.38875 7.99995 8.38875C6.04121 8.38875 4.47062 6.81873 4.47062 4.86071C4.47062 2.90269 6.04121 1.33334 7.99995 1.33334C9.95935 1.33334 11.5293 2.90269 11.5293 4.86071ZM7.99996 14.6667C5.10821 14.6667 2.66663 14.1967 2.66663 12.3833C2.66663 10.5693 5.12355 10.116 7.99996 10.116C10.8924 10.116 13.3333 10.586 13.3333 12.3993C13.3333 14.2133 10.8764 14.6667 7.99996 14.6667Z"
                fill={color}
            />
        </svg>
    );
};

export default PersonIcon;
