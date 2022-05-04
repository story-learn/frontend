import { FormEventHandler, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
    InputSearch,
    Stories,
    LoadingIndicator,
    Accounts,
} from "../components";
import { StyledSearchPage } from "../components/Styles/StyledSearchPage";
import { StyledForm } from "../components/Form/FormStyles";
import { useStories } from "../context/StoriesContext";
import { useInfiniteScroll } from "../Hooks/useInfiniteScroll";
import { HomeStory, Search as SearchInterface } from "../interfaces";
import { searchStory } from "../utilities/Story";
import { SearchCategories, SearchHeader } from "../modules/Search";
import { IAccount } from "../components/Accounts/Account";
import { HandleFollowCreator } from "../components/Story/Stories";
import useStoryRequest from "../Hooks/useStoryRequest";
import { determineSearchUrl } from "../utilities/Search";

export type Category = "" | "story" | "username";

const Search: NextPage = () => {
    const { query, push, pathname } = useRouter();
    const { storyInstance } = useStoryRequest();

    let {
        stories: {
            search: { category, value },
        },
        dispatchStories,
    } = useStories();

    let searchUrl = determineSearchUrl(value, category);

    let { currentPage, error, loading, totalData, totalPages } =
        useInfiniteScroll<HomeStory | IAccount>(searchUrl, storyInstance);

    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState<(HomeStory | IAccount)[]>([]);

    useEffect(() => {
        if (totalData) setSearchData(totalData);
    }, [totalData]);

    const handleChangeCategory = (category: string) => {
        // totalData = []; // ! this is not working!!

        totalData.length = 0; // + this works
        setSearchData([]);
        dispatchStories({ type: "search", payload: { category } });
    };

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

        searchStory(search, dispatchStories);
    };

    const handleFollowCreator: HandleFollowCreator = (
        following_story_creator,
        creatorId
    ) => {
        let newData = [...searchData] as HomeStory[];
        newData.forEach((story) => {
            if (story.user.id === creatorId) {
                story.following_story_creator = !following_story_creator;
            }
        });
        setSearchData(newData);
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
                        {!value ? (
                            <h2>Search for a word</h2>
                        ) : (
                            <>
                                {!loading && searchData.length === 0 ? (
                                    <div>No result found</div>
                                ) : (
                                    <>
                                        {category === "story" && (
                                            <Stories
                                                stories={
                                                    searchData as HomeStory[]
                                                }
                                                handleFollowCreator={
                                                    handleFollowCreator
                                                }
                                            />
                                        )}
                                        {category === "username" && (
                                            <Accounts
                                                users={searchData as IAccount[]}
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
