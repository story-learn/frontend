import { FC, useEffect } from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { IAccount } from "../../components/Accounts/Account";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
import { useFetch } from "../../Hooks/useFetch";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { useSWRFetch } from "../../Hooks/useSwrFetch";
import { HomeStory } from "../../interfaces";

const Followers: FC = () => {
    // console.log("followers rendered...");

    let {
        profile: {
            main: { data: profile },
        },
    } = useProfileContext()!;
    let { id } = profile!;

    let followersUrl = `${BASE_URLS.Story}${StoryRoutes.GET_FOLLOWERS}/?user_id=${id}`;

    let { data, error, loading } = useSWRFetch<IAccount[]>(followersUrl);

    useEffect(() => {
        console.log("user either followr or unfollows");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.followers_count]);

    return (
        <section>
            {data && data.length > 0 && <Accounts users={data} />}
            {loading && <LoadingIndicator />}
            {!loading && error && <p>There is an error</p>}
        </section>
    );
};

export default Followers;
