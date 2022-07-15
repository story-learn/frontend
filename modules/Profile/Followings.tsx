import { FC, useRef } from "react";
import People from "./People";

const Followings: FC = () => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    return <People type="following" loadMoreRef={loadMoreRef} />;
};

export default Followings;
