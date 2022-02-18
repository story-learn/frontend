import { FC } from "react";
import { Search } from "../../interfaces";

interface IHeader {
    search: Search["value"];
}

const Header: FC<IHeader> = ({ search }) => {
    return (
        <header className="search__header">
            <h1 className="search__header-h1">
                Search Results for <span>{search}</span>
            </h1>
        </header>
    );
};

export default Header;
