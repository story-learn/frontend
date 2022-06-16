import { FC } from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { IAccount } from "../../components/Accounts/Account";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
import { useSWRFetch } from "../../Hooks/useSwrFetch";
import People from "./People";

const Followings: FC = () => {
    let {
        profile: {
            main: { data: profile },
        },
    } = useProfileContext()!;
    let { id } = profile!;

    let followingUrl = `${BASE_URLS.Story}${StoryRoutes.GET_FOLLOWING}/?user_id=${id}`;
    // console.log({ followingUrl });

    const dispatchFollowingsAction: IAccount["dispatchFollowAction"] = (
        status
    ) => {
        if (status) {
            console.log("action failed followings");
        } else {
            console.log("action successful followings");
        }
    };

    return (
        <People
            url={followingUrl}
            dispatchFollowAction={dispatchFollowingsAction}
        />
    );

    // let { data, error, loading } = useSWRFetch<IAccount[]>(followingUrl);
    // let { data, error, loading } =
    //     useSWRFetch<
    //         { created: string; id: number; person_user_follows_id: IAccount }[]
    //     >(followingUrl);

    // let accounts: IAccount[] = [];

    // if (data) {
    //     accounts = [...data].map(
    //         ({ person_user_follows_id }) => person_user_follows_id
    //     );
    // }

    // const dispatchFollowingsAction: IAccount["dispatchFollowAction"] = (
    //     status
    // ) => {
    //     if (status) {
    //         console.log("action failed followings");
    //     } else {
    //         console.log("action successful followings");
    //     }
    // };

    // return (
    //     <section>
    //         {loading ? (
    //             <LoadingIndicator />
    //         ) : error ? (
    //             <p>error</p>
    //         ) : accounts.length > 0 ? (
    //             <Accounts
    //                 users={accounts}
    //                 dispatch={dispatchFollowingsAction}
    //             />
    //         ) : (
    //             <p>0 following</p>
    //         )}
    //     </section>
    // );
};

export default Followings;
