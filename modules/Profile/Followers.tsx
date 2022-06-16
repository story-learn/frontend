import { FC } from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { IAccount } from "../../components/Accounts/Account";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
import { useFetch } from "../../Hooks/useFetch";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import { useSWRFetch } from "../../Hooks/useSwrFetch";
import { HomeStory } from "../../interfaces";
import People from "./People";

const Followers: FC = () => {
    // console.log("followers rendered...");

    let {
        profile: {
            main: { data: profile },
        },
    } = useProfileContext()!;
    let { id } = profile!;

    let followersUrl = `${BASE_URLS.Story}${StoryRoutes.GET_FOLLOWERS}/?user_id=${id}`;

    const dispatchFollowersAction: IAccount["dispatchFollowAction"] = (
        status
    ) => {
        if (status) {
            console.log("action failed followers");
        } else {
            console.log("action successful followers");
        }
    };

    return (
        <People
            url={followersUrl}
            dispatchFollowAction={dispatchFollowersAction}
        />
    );

    // let { data, error, loading } = useSWRFetch<IAccount[]>(followersUrl);
    // let { data, error, loading } = useSWRFetch<{
    //     num_of_pages: number;
    //     object_count: number;
    //     previous: null | string;
    //     results: { created: string; id: number; user_id: IAccount }[];
    // }>(followersUrl);

    // let accounts: IAccount[] = [];
    // if (data) {
    //     console.log(data);
    //     accounts = [...data.results].map(({ user_id }) => user_id);
    // }

    // const dispatchFollowersAction: IAccount["dispatchFollowAction"] = (
    //     status
    // ) => {
    //     if (status) {
    //         console.log("action failed followers");
    //     } else {
    //         console.log("action successful followers");
    //     }
    // };

    // return (
    //     <section>
    //         {loading ? (
    //             <LoadingIndicator />
    //         ) : error ? (
    //             <p>error</p>
    //         ) : accounts.length > 0 ? (
    //             <Accounts users={accounts} dispatch={dispatchFollowersAction} />
    //         ) : (
    //             <p>0 followers</p>
    //         )}
    //     </section>
    // );
};

export default Followers;
