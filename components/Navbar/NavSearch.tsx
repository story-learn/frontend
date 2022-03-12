import { FC, FormEventHandler, useEffect, useState } from "react";
import { StyledForm } from "../Form/FormStyles";
import { InputSearch } from "./../../components";
import { useStories } from "../../context/StoriesContext";
import { useRouter } from "next/router";
import { searchStory } from "../../utilities/Story";

const NavSearch: FC = () => {
    const { push, pathname } = useRouter();
    let {
        dispatchStories,
        stories: {
            search: { value },
        },
    } = useStories();
    const [search, setSearch] = useState(value);

    const handleSearchStories: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        searchStory(search, dispatchStories);

        // go to search page if user is not on search page
        if (pathname !== "/search") {
            push(`/search?value=${search}`);
        }
    };

    useEffect(() => {
        if (pathname === "/search") return;

        dispatchStories({
            type: "search",
            // default to story category
            payload: { category: "story", value: "" },
        });

        // empty search bar
        setSearch("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <StyledForm
            onSubmit={handleSearchStories}
            className="nav__large"
            role="search"
        >
            <InputSearch
                handleChange={(e) => {
                    setSearch(e.target.value);
                }}
                placeholder="Search"
                value={search}
            />
        </StyledForm>
    );
};

export default NavSearch;
