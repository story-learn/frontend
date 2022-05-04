import { FC, useEffect } from "react";
import { LoadingIndicator } from "../../components";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { HomeStory, Profile } from "../../interfaces";
import { Stories as StoriesComponent } from "../../components";
import { Tabs } from "../../pages/profiles/[id]";
import { useProfileContext } from "../../context/pages/Profile";

type IStories = Pick<Tabs, "selected">;
type IProfile = Pick<Profile, "id">;

interface Stories extends IStories, IProfile {}

const Stories: FC<{ id: number }> = ({ id }) => {
    // console.log("stories rendered...");

    let {
        profile: {
            stories: { data, page, pages },
        },
        dispatchProfile,
    } = useProfileContext()!;

    let storiesUrl = `${BASE_URLS.Story}${StoryRoutes.GET_PROFILE_STORIES}&search=${id}`;

    let { totalData, loading, error, currentPage, totalPages } =
        useInfiniteScroll<HomeStory[]>(storiesUrl, undefined, page, pages);

    useEffect(() => {
        if (!totalData) return;

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

    return (
        <section className="profile__stories">
            {data.length > 0 ? (
                <StoriesComponent
                    stories={data}
                    // FIXME: handle this in another pull request
                    handleFollowCreator={() => {}}
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
