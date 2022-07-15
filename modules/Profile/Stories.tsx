import {
    FC,
    // useEffect,
    useRef,
} from "react";
// import { LoadingIndicator } from "../../components";
// import { StoryRoutes } from "../../configs/story";
// import { BASE_URLS } from "../../Constants";
// import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import {
    // HomeStory,
    Profile,
} from "../../interfaces";
import { Stories as StoriesComponent } from "../../components";
import { Tabs } from "../../pages/profiles/[id]";
// import { useProfileContext } from "../../context/pages/Profile";
// import useStoryRequest from "../../Hooks/useStoryRequest";
// import { HandleFollowCreator } from "../../components/Story/Stories";
// import { IStory } from "../../components/Story/Story";
// import { returnUniqueArrayObject } from "../../utilities/returnUniqueArrayObject";
// import { useSwrInfiniteScroll } from "../../Hooks/useSwrInfinite";
import { StoriesContainer } from ".";

type IStories = Pick<Tabs, "selected">;
type IProfile = Pick<Profile, "id">;

interface Stories extends IStories, IProfile {}

const Stories: FC<{ id: number }> = ({ id }) => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    return (
        <StoriesContainer id={id} loadMoreRef={loadMoreRef} type="stories" />
    );
};

export default Stories;
