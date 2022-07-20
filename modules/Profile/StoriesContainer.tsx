import { FC, RefObject, useEffect, useRef } from "react";
import { LoadingIndicator, Stories } from "../../components";
import { useProfileContext } from "../../context/pages/Profile";
import { HomeStory, LikedStories, Profile } from "../../interfaces";
import { returnUniqueArrayObject } from "../../utilities/returnUniqueArrayObject";
import { IStory } from "../../components/Story/Story";
import { HandleFollowCreator } from "../../components/Story/Stories";
import { useSwrInfiniteScroll } from "../../Hooks/useSwrInfinite";
import useStoryRequest from "../../Hooks/useStoryRequest";
import { BASE_URLS } from "../../Constants";
import { StoryRoutes } from "../../configs/story";

interface Props {
    id: number;
    loadMoreRef: RefObject<HTMLDivElement>;
    type: "likes" | "stories";
}

const StoriesContainer: FC<Props> = ({ id, loadMoreRef, type }) => {
    const { storyInstance } = useStoryRequest();

    let {
        dispatchProfile,
        profile: {
            [type]: { data: stories, page, pages },
            tabs: { lists },
        },
    } = useProfileContext()!;

    let storiesUrl = `${BASE_URLS.Story}`;

    storiesUrl +=
        type === "likes"
            ? `${StoryRoutes.GET_PROFILE_LIKES}?user_id=${id}`
            : `${StoryRoutes.GET_PROFILE_STORIES}&search=${id}`;

    let {
        loading,
        error,
        results: totalData,
        page: currentPage,
        pages: totalPages,
    } = useSwrInfiniteScroll<HomeStory | LikedStories>(
        loadMoreRef,
        storiesUrl,
        storyInstance,
        page,
        pages
    );

    useEffect(() => {
        if (!totalData || loading) return;

        let data = [...(totalData as HomeStory[])];

        if (type === "likes") {
            data = [...(totalData as LikedStories[])].map(({ story }) => story);
        }

        dispatchProfile({
            // type: "stories_fetched",
            type: "profile_tab_data_fetched",
            payload: {
                data,
                page: currentPage,
                pages: totalPages,
                type,
            },
            // payload: { data, page: currentPage, pages: totalPages, type },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalData]);

    const handleFollowCreator: HandleFollowCreator = (
        following_story_creator,
        creatorId
    ) => {
        let data = [...stories].map((story) => {
            if (story.user.id === creatorId)
                story.following_story_creator = !following_story_creator;
            return story;
        });
        dispatchProfile({
            type: "profile_tab_data_updated",
            payload: { data, type },
        });

        let followings = lists[3].value!;

        // console.log({ type: typeof following_count, following_count });

        dispatchProfile({
            type: "profile_update_tab_data_count",
            payload: {
                tab: "Following",
                value: following_story_creator
                    ? followings - 1
                    : followings + 1,
            },
        });
    };

    const handleBookmarkStory = (storyId: number, bookmarked: boolean) => {
        let story = stories.find((story) => story.id === storyId)!;
        story.user_bookmarked_story = bookmarked;
        dispatchProfile({
            type: "profile_tab_data_updated",
            payload: { data: stories, type },
        });
    };

    const hanldeLikeStory = (storyId: number, userLikedStory: boolean) => {
        let data = [...stories];
        if (type === "likes") {
            data = data.filter((story) => story.id !== storyId); // remove the story from the list
        } else {
            let story = data.find((story) => story.id === storyId)!;
            story.likes = userLikedStory ? story.likes - 1 : story.likes + 1;
            story.user_liked_story = !userLikedStory;
        }
        dispatchProfile({
            type: "profile_tab_data_updated",
            payload: { data, type },
        });
    };

    return (
        <section className="profile__stories">
            {stories.length > 0 ? (
                <Stories
                    stories={stories}
                    handleFollowCreator={handleFollowCreator}
                    handleLikeStory={hanldeLikeStory}
                    handleBookmarkStory={handleBookmarkStory}
                />
            ) : stories.length === 0 && !loading ? (
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
            <div
                ref={loadMoreRef}
                aria-hidden
                style={{
                    width: "100%",
                    height: "0.1rem",
                }}
            ></div>
        </section>
    );
};

export default StoriesContainer;
