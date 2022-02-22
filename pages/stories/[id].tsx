import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LoadingIndicator } from "../../components";
import { StyledStoryPage } from "../../components/Styles/StyledStoryPage";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useFetch } from "../../Hooks/useFetch";
import { StorySlider } from "../../modules/Story";
import { HomeStory } from "./../../interfaces/index";

type PickStory = Omit<HomeStory, "frames">;

export interface IStory extends PickStory {
    frames: HomeStory["frames"][];
}

const Story: NextPage = () => {
    const { query } = useRouter();

    let storyId = query?.id;
    let storyUrl = storyId
        ? `${BASE_URLS.Story}${StoryRoutes.GET_STORY}/${storyId}/`
        : false;

    let { data, error, loading } = useFetch<IStory>(storyUrl);

    return (
        <>
            <StyledStoryPage>
                {loading && <LoadingIndicator />}
                {error && <div>Error</div>}
                {data && <StorySlider {...data} />}
            </StyledStoryPage>
        </>
    );
};

export default Story;
