import { FC } from "react";
import { Accounts, LoadingIndicator } from "../../components";
import { IAccount } from "../../components/Accounts/Account";
import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { useProfileContext } from "../../context/pages/Profile";
import { useSWRFetch } from "../../Hooks/useSwrFetch";

const Followings: FC = () => {
    let {
        profile: {
            main: { data: profile },
        },
    } = useProfileContext()!;
    let { id } = profile!;

    let followingUrl = `${BASE_URLS.Story}${StoryRoutes.GET_FOLLOWING}/?user_id=${id}`;
    console.log({ followingUrl });

    let { data, error, loading } = useSWRFetch<IAccount[]>(followingUrl);

    console.log(data);

    return (
        <section>
            {data && data.length > 0 && <Accounts users={data} />}
            {loading && <LoadingIndicator />}
            {!loading && error && <p>There is an error</p>}
        </section>
    );
};

export default Followings;
