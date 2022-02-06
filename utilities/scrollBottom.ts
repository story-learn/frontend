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
