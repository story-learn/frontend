import { FC } from "react";
import { Button } from "../../components";
import { Tabs as PTabs, HandleTabChanged } from "../../pages/profiles/[id]";

interface ITabs {
    tabs: PTabs;
    handleTabChanged: HandleTabChanged;
}

const Tabs: FC<ITabs> = ({ tabs: { lists, selected }, handleTabChanged }) => {
    return (
        <header className="profile__tabs--cont">
            <ul className="flex profile__tabs">
                {lists.map(({ tab, value }) => (
                    <li key={tab} className="profile__tab">
                        <Button
                            variant="no-border"
                            className={`flex profile__tab--btn ${
                                tab === selected && "profile__tab--btn-active"
                            } `}
                            onClick={() => handleTabChanged(tab)}
                            disabled={tab === selected}
                            text={
                                (
                                    <>
                                        {tab}{" "}
                                        {value && (
                                            <span className="profile__tab--val flex">
                                                {value}
                                            </span>
                                        )}
                                    </>
                                ) as unknown as string
                            }
                        />
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Tabs;
