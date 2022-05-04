import { FC, useEffect } from "react";
import { LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { HomeStory, Profile } from "../../interfaces";
import { Stories as StoriesComponent } from "../../components";
import { Tabs } from "../../pages/profiles/[id]";
import { useProfileContext } from "../../context/pages/Profile";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { HandleFollowCreator } from "../../components/Story/Stories";

type IStories = Pick<Tabs, "selected">;
type IProfile = Pick<Profile, "id">;

interface Stories extends IStories, IProfile {}

const StoriesLikes: FC<{ id: number }> = ({ id }) => {
    const { storyInstance } = useStoryRequest();
    let {
        profile: {
            likes: { data, page, pages },
        },
        dispatchProfile,
    } = useProfileContext()!;

    let storiesUrl = `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE_LIKES}?user_id=${id}`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<HomeStory[]>(storiesUrl, storyInstance, page, pages);

    useEffect(() => {
        if (!totalData || loading) return;

        dispatchProfile({
            type: "profile_stories_likes",
            payload: {
                data: totalData,
                page: currentPage,
                pages: totalPages,
            },
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalData]);

    const handleFollowCreator: HandleFollowCreator = (
        following_story_creator,
        _
    ) => {
        let newData = [...data];

        newData.forEach((story) => {
            story.following_story_creator = !following_story_creator;
        });

        dispatchProfile({
            type: "profile_stories",
            payload: {
                data: newData,
                page: currentPage,
                pages: totalPages,
            },
        });
    };

    return (
        <section className="profile__stories">
            {data.length > 0 ? (
                <StoriesComponent
                    stories={data}
                    handleFollowCreator={handleFollowCreator}
                />
            ) : data.length === 0 && !loading ? (
                <p className="profile__stories--other profile__stories--other-no">
                    No Stories
                </p>
            ) : null}
            {loading && <LoadingIndicator />}
            {error && (
                <p className="profile__stories--other profile__stories--other-error">
                    There is an error...
                </p>
            )}
        </section>
    );
};

export default StoriesLikes;
