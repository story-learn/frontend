import { FormEventHandler, useEffect, useRef, useState } from "react";
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
import { useSwrInfiniteScroll } from "../Hooks/useSwrInfinite";

export type Category = "" | "story" | "username";

const Search: NextPage = () => {
    const { query, push, pathname } = useRouter();
    const { storyInstance } = useStoryRequest();
    const loadRef = useRef<HTMLDivElement>(null);

    let {
        stories: {
            search: { category, value },
        },
        dispatchStories,
    } = useStories();

    // let searchUrl = storyInstance && determineSearchUrl(value, category);
    let searchUrl = determineSearchUrl(value, category);

    // let { currentPage, error, loading, totalData, totalPages } =
    //     useInfiniteScroll<HomeStory | IAccount>(searchUrl, storyInstance);

    let {
        results: totalData,
        error,
        loading,
    } = useSwrInfiniteScroll<HomeStory | IAccount>(
        loadRef,
        searchUrl,
        storyInstance,
        1,
        1
    );

    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState<(HomeStory | IAccount)[]>([]);

    useEffect(() => {
        // console.log({ totalData, loading });

        if (loading && !totalData) setSearchData([]);

        if (totalData) setSearchData(totalData);
    }, [totalData, loading]);

    const handleChangeCategory = (category: string) => {
        totalData = []; // ! this is not working!!

        // totalData.length = 0; // + this works
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

    const handleLikeStory = (storyId: number, userLikedStory: boolean) => {
        let stories = ([...searchData] as HomeStory[]).map((story) => {
            if (story.id === storyId) {
                story = {
                    ...story,
                    user_liked_story: !userLikedStory,
                    likes: userLikedStory ? story.likes - 1 : story.likes + 1,
                };
            }

            return story;
        });

        setSearchData(stories);
    };

    const handleBookmarkStory = (storyId: number, bookmarked: boolean) => {
        let stories = ([...searchData] as HomeStory[]).map((story) => {
            if (story.id === storyId) {
                story.user_bookmarked_story = bookmarked;
            }

            return story;
        });

        setSearchData(stories);
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
                                                handleLikeStory={
                                                    handleLikeStory
                                                }
                                                handleBookmarkStory={
                                                    handleBookmarkStory
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
                        <div ref={loadRef} data-ref="loading"></div>
                    </section>
                </div>
            </StyledSearchPage>
        </>
    );
};

export default Search;
