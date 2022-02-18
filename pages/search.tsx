import { NextPage } from "next";
import { InputSearch, Stories, LoadingIndicator } from "../components";
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

    // only show maximum of 15 stories from homepage
    stories = stories.slice(0, 15);

    const [search, setSearch] = useState("");
    const [intialRender, setIntialRender] = useState(true);

    let baseUrl = `${BASE_URLS.Story}${StoryRoutes.GET_STORIES}`;
    let searchUrl = "";

    if (value) {
        searchUrl = `${baseUrl}/?search=${value}`;

        if (category) {
            searchUrl = `${searchUrl}&category=${category}`;
        }
    }

    console.log({ searchUrl });

    const { currentPage, error, loading, totalData, totalPages } =
        useInfiniteScroll<HomeStory>(searchUrl);

    // console.log({
    //     //
    //     // category,
    //     // value,
    //     // searchUrl,
    // });

    // console.log({
    //     //
    //     // currentPage,
    //     // error,
    //     // loading,
    //     // totalData,
    //     // totalPages,
    // });

    const handleChangeCategory = (category: string) => {
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

        searchStory(search, dispatchStories);
        setIntialRender(false);
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
                    <section>
                        {intialRender ? (
                            <Stories stories={stories} />
                        ) : (
                            <>
                                <Stories stories={totalData} />
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
