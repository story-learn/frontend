import { FC } from "react";
import Tabs from "./Tabs";
// import { Tabs as ITabs, HandleTabChanged } from "../../pages/profiles/[id]";
import { ProfileStories, StoriesLikes, Followers, Followings } from "./index";
import { Profile } from "../../interfaces";
import { useProfileContext } from "../../context/pages/Profile";

type PMain = Pick<Profile, "id">;

interface IMain extends PMain {}

interface PrivateTabs {
    [key: string]: () => JSX.Element;
}

/**
 *
 * @param selected normal selected tab to decide which tab to show
 * @param newSelected new one to decided= whether to show stories or people
 * @returns selected tab
 */

const tabs = (selected: string, id: number) => {
    const allTabs: PrivateTabs = {
        "Stories": () => <ProfileStories id={id} />,
        "Likes": () => <StoriesLikes id={id} />,
        "Followers": () => <Followers />,
        "Following": () => <Followings />,
    };

    return allTabs[selected];
};

const Main: FC<IMain> = ({ id }) => {
    let {
        profile: {
            tabs: { selected },
        },
    } = useProfileContext()!;

    let selectedTab = tabs(selected, id);

    return (
        <div className="profile__main--section flex">
            <Tabs />
            {selectedTab?.()}
        </div>
    );
};

export default Main;
