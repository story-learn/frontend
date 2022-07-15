import {
    FC,
    // useEffect,
    useRef,
} from "react";
// import { LoadingIndicator } from "../../components";
// import { StoryRoutes } from "../../configs/story";
// import { BASE_URLS } from "../../Constants";
// import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
// import {
//     // HomeStory,
//     // LikedStories,
//     // Profile,
// } from "../../interfaces";
// import { Stories as StoriesComponent } from "../../components";
// import { Tabs } from "../../pages/profiles/[id]";
// import { useProfileContext } from "../../context/pages/Profile";
// import useStoryRequest from "../../Hooks/useStoryRequest";
// import { HandleFollowCreator } from "../../components/Story/Stories";
// import { IStories as StoriesList } from "../../components/Story/Stories";
// import { useAuth } from "../../context/AuthContext";
// import { returnUniqueArrayObject } from "../../utilities/returnUniqueArrayObject";
// import { useAuth } from "../../Hooks/useAuth";
// import { useSwrInfiniteScroll } from "../../Hooks/useSwrInfinite";
import { StoriesContainer } from ".";

// type IStories = Pick<Tabs, "selected">;
// type IProfile = Pick<Profile, "id">;

// interface Stories extends IStories, IProfile {}

const StoriesLikes: FC<{ id: number }> = ({ id }) => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    return <StoriesContainer id={id} loadMoreRef={loadMoreRef} type="likes" />;
};

export default StoriesLikes;
