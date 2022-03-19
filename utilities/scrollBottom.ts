/**
 * checks if a user is some distance away from the bottom of the page
 * @type {function}
 * @returns {boolean} boolean
 */

export const scrollBottom = (): boolean => {
    let scrolledFromTop = window.scrollY,
        visibleWindow = document.documentElement.clientHeight,
        documentHeight = document.documentElement.scrollHeight;

    let distanceAwayFromBottom = 300;

    return (
        scrolledFromTop + visibleWindow + distanceAwayFromBottom >=
        documentHeight
    );
};
