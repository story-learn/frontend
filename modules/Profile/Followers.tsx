import { FC, useRef } from "react";
import People from "./People";

const Followers: FC = () => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    return <People type="followers" loadMoreRef={loadMoreRef} />;
};

export default Followers;
