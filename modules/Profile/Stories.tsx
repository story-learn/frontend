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
import { IStory } from "../../components/Story/Story";
import { returnUniqueArrayObject } from "../../utilities/returnUniqueArrayObject";

type IStories = Pick<Tabs, "selected">;
type IProfile = Pick<Profile, "id">;

interface Stories extends IStories, IProfile {}

const Stories: FC<{ id: number }> = ({ id }) => {
    const { storyInstance } = useStoryRequest();

    let {
        profile: {
            stories: { data, page, pages },
        },
        dispatchProfile,
    } = useProfileContext()!;

    let storiesUrl =
        storyInstance &&
        `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE_STORIES}&search=${id}`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<HomeStory[]>(storiesUrl, storyInstance, page, pages);

    useEffect(() => {
        if (!totalData || loading) return;

        dispatchProfile({
            type: "profile_stories",
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

    const handleLikeStory: IStory["handleLikeStory"] = (
        storyId,
        userLikedStory
    ) => {
        let newData = [...data].map((story) => {
            if (story.id === storyId) {
                let { likes, user_liked_story } = story;

                likes = userLikedStory ? likes - 1 : likes + 1;
                user_liked_story = !userLikedStory;

                story = {
                    ...story,
                    likes,
                    user_liked_story,
                };
            }
            return story;
        });

        dispatchProfile({
            type: "stories_liked_or_unliked",
            payload: { data: newData, type: "profileStories" },
        });
    };

    const handleBookmarkStory = (storyId: number, bookmarked: boolean) => {
        let newData = returnUniqueArrayObject([...data], "id").map((story) => {
            if (story.id === storyId) {
                story.user_bookmarked_story = bookmarked;
            }

            return story;
        });

        dispatchProfile({
            type: "stories_updated",
            payload: {
                data: newData as HomeStory[],
                type: "profileStories",
            },
        });
    };

    return (
        <section className="profile__stories">
            {data.length > 0 ? (
                <StoriesComponent
                    stories={data}
                    handleFollowCreator={handleFollowCreator}
                    handleLikeStory={handleLikeStory}
                    handleBookmarkStory={handleBookmarkStory}
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

export default Stories;
