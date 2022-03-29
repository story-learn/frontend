import { FC } from "react";
import Tabs from "./Tabs";
import { Tabs as ITabs, HandleTabChanged } from "../../pages/profiles/[id]";
import { ProfileStories, People } from "./index";

interface IMain {
    tabs: ITabs;
    handleTabChanged: HandleTabChanged;
}

interface PrivateTabs {
    [key: string]: () => JSX.Element;
}

/**
 *
 * @param selected normal selected tab to decide which tab to show
 * @param newSelected new one to decided= whether to show stories or people
 * @returns selected tab
 */
const tabs = (selected: string, newSelected: string) => {
    const allTabs: PrivateTabs = {
        "Stories": () => <ProfileStories selected={selected} />,
        "People": () => <People selected={selected} />,
    };

    return allTabs[newSelected];
};

const Main: FC<IMain> = (props) => {
    const {
        tabs: { selected },
    } = props;

    let newSelected =
        selected === "Stories" || selected === "Likes" ? "Stories" : "People";

    let selectedTab = tabs(selected, newSelected);

    return (
        <div className="profile__main--section flex">
            <Tabs {...props} />
            {selectedTab?.()}
        </div>
    );
};

export default Main;
