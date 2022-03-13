import { NextPage } from "next";
import {
    InputSearch,
    Stories,
    LoadingIndicator,
    Accounts,
} from "../components";
import { StyledSearchPage } from "../components/Styles/StyledSearchPage";
import { StyledForm } from "../components/Form/FormStyles";
import { FormEventHandler, useEffect, useState } from "react";
import { useStories } from "../context/StoriesContext";
import { BASE_URLS } from "../Constants";
import { StoryRoutes } from "../configs/story";
import { useRouter } from "next/router";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";
import { HomeStory, Search as SearchInterface } from "../interfaces";
import { searchStory } from "../utilities/Story";
import { SearchCategories, SearchHeader } from "../modules/Search";
import { IAccount } from "../components/Accounts/Account";

export type Category = "" | "story" | "username";

const Search: NextPage = () => {
    const { query, push, pathname } = useRouter();

    let {
        stories: {
            data: stories,
            search: { category, value },
        },
        dispatchStories,
    } = useStories();

    let baseUrl = BASE_URLS.Story;
    let searchUrl = "";

    if (value) {
        searchUrl = baseUrl;

        if (category === "story") {
            searchUrl += `${StoryRoutes.GET_STORIES}/?search=${value}&category=${category}`;
        } else {
            searchUrl += StoryRoutes.GET_USERS;

            let useUserNameAsCategory = false,
                currentSearch = value; // save it in a new variable so as the preserve the real one

            // remove @ because we're going to use username as the category
            if (currentSearch.startsWith("@")) {
                currentSearch = currentSearch.slice(1);
                useUserNameAsCategory = true;
            }

            // this searches for username, firstName and lastName
            searchUrl += `/?search=${currentSearch}`;

            // this limits search to username only
            if (useUserNameAsCategory) searchUrl += `&category=${category}`;
        }
    }

    let { currentPage, error, loading, totalData, totalPages } =
        useInfiniteScroll<HomeStory | IAccount>(searchUrl);

    const [search, setSearch] = useState("");
    const [initialRender, setInitialRender] = useState(true);

    // only show maximum of 15 stories from homepage
    stories = stories.slice(0, 15);

    const handleChangeCategory = (category: string) => {
        // totalData = []; // ! this is not working!!

        totalData.length = 0; // + this works
        dispatchStories({ type: "search", payload: { category } });
    };

    useEffect(() => {
        if (!value) return;

        if (!loading) setInitialRender(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    // update path url when search/category changes
    useEffect(() => {
        // don't update if there is no search value
        if (!value) return;

        let newUrl = `${pathname}?value=${value}`;
        if (category) newUrl += `&category=${category}`;

        push(newUrl, undefined, { shallow: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, value]);

    useEffect(() => {
        let { value, category } = query as unknown as SearchInterface;

        if (!value) return;

        dispatchStories({ type: "search", payload: { value, category } });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!search) return;
        setInitialRender(false);

        searchStory(search, dispatchStories);
    };

    return (
        <>
            <StyledSearchPage>
                <StyledForm onSubmit={handleSearch} className="search__form">
                    <InputSearch
                        handleChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                    />
                </StyledForm>
                {/*  */}
                <SearchHeader search={value} />
                <div className="search__container">
                    <SearchCategories
                        category={category}
                        handleChangeCategory={handleChangeCategory}
                    />
                    <section className="search__result">
                        {!loading && initialRender && stories.length > 0 && (
                            <Stories stories={stories} />
                        )}

                        {!initialRender && (
                            <>
                                {!loading && totalData.length === 0 ? (
                                    <div>No result found</div>
                                ) : (
                                    <>
                                        {category === "story" && (
                                            <Stories
                                                stories={
                                                    totalData as HomeStory[]
                                                }
                                            />
                                        )}
                                        {category === "username" && (
                                            <Accounts
                                                users={totalData as IAccount[]}
                                                className="search__profiles"
                                            />
                                        )}
                                    </>
                                )}
                                {loading && <LoadingIndicator />}
                                {error && <div>There is an Error</div>}
                            </>
                        )}
                    </section>
                </div>
            </StyledSearchPage>
        </>
    );
};

export default Search;
