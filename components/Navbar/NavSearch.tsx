import { FC } from "react";
import { StyledNavSearch } from "./StyledNavSearch";
import { FiSearch } from "react-icons/fi";

const NavSearch: FC = () => {
    return (
        <StyledNavSearch role="search" className="nav__large">
            <input
                type="search"
                id="search"
                name="search"
                placeholder="search"
                aria-placeholder="search"
            />
            <button type="submit">
                <FiSearch />
            </button>
        </StyledNavSearch>
    );
};

export default NavSearch;
