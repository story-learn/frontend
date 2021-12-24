import { FC } from "react";

const LightIcon: FC = () => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            className="toggle__icon toggle__icon--checkmark"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path d="M0 14.98H14V0.98H0V14.98Z" fill="url(#pattern0)" />
            <defs>
                <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use
                        xlinkHref="#image0_236_128"
                        transform="scale(0.015625)"
                    />
                </pattern>
                <image
                    id="image0_236_128"
                    width="64"
                    height="64"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
};

export default LightIcon;
