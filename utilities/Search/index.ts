import { StoryRoutes } from "../../configs/story";
import { BASE_URLS } from "../../Constants";
import { Search } from "../../interfaces";

/**
 * @description This function determines the url to be used for the search based on the search category
 * @param category - search category
 * @param value - search value
 * @returns {string} - search url
 */

export const determineSearchUrl = (
    value: Search["value"],
    category: Search["category"]
) => {
    let baseUrl = BASE_URLS.Story;
    let searchUrl = "";

    // if (value && !authenticating) {
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

    return searchUrl;
};
