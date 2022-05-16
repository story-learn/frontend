import { FC, useEffect } from "react";
import { LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { LikedStories, Profile } from "../../interfaces";
import { Stories as StoriesComponent } from "../../components";
import { Tabs } from "../../pages/profiles/[id]";
import { useProfileContext } from "../../context/pages/Profile";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { HandleFollowCreator } from "../../components/Story/Stories";
import { IStories as StoriesList } from "../../components/Story/Stories";
import { useAuth } from "../../context/AuthContext";

type IStories = Pick<Tabs, "selected">;
type IProfile = Pick<Profile, "id">;

interface Stories extends IStories, IProfile {}

const StoriesLikes: FC<{ id: number }> = ({ id }) => {
    const { storyInstance } = useStoryRequest();
    const { user } = useAuth();
    let {
        profile: {
            likes: { data, page, pages },
        },
        dispatchProfile,
    } = useProfileContext()!;

    let storiesUrl =
        storyInstance &&
        `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE_LIKES}?user_id=${id}`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<LikedStories[]>(
            storiesUrl,
            storyInstance,
            page,
            pages
        );

    useEffect(() => {
        if (!totalData || loading) return;

        const data = [...totalData].map(({ story }) => story);

        dispatchProfile({
            type: "profile_stories_likes",
            payload: {
                // data: totalData,
                data,
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

    const handleLike: StoriesList["handleLikeStory"] = (
        storyId,
        userLikedStory,
        isError
    ) => {
        let dataBeforeError = [...data]; // use this to revert UI if there is an error if logged in user is on their profile.
        let newData = [...data].filter((story) => story.id !== storyId);

        if (id === user!.user_id) {
            newData = isError
                ? dataBeforeError
                : newData.filter(({ id }) => id !== storyId); // remove stories from list of liked stories if logged in user is on their profile
        } else {
            newData = newData.map((story) => {
                if (story.id === storyId) {
                    story = {
                        ...story,
                        user_liked_story: !userLikedStory,
                        likes: userLikedStory
                            ? story.likes - 1
                            : story.likes + 1,
                    };
                }

                return story;
            });
        }

        dispatchProfile({
            type: "stories_liked_or_unliked",
            payload: {
                data: newData,
                type: "profileStoriesLikes",
            },
        });
    };

    return (
        <section className="profile__stories">
            {data.length > 0 ? (
                <StoriesComponent
                    stories={data}
                    handleFollowCreator={handleFollowCreator}
                    handleLikeStory={handleLike}
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
