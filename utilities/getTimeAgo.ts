export const getTimeAgo = (millisecondsAgo: number) => {
    let totalSecondsAgo = +Math.floor((Date.now() - millisecondsAgo) / 1000);

    if (totalSecondsAgo === 0) return "now";

    if (totalSecondsAgo < 59) return `${totalSecondsAgo}s`;

    // 123 secs / 60 = 2 mins 3 secs
    let minutesAgo = totalSecondsAgo / 60;

    // obtain the whole number
    minutesAgo = Math.floor(minutesAgo);

    if (minutesAgo < 60) return `${minutesAgo}m`;

    // 71 mins / 60 = 1 hr 11 min
    let hoursAgo = minutesAgo / 60;

    // obtain the whole number
    hoursAgo = Math.floor(hoursAgo);

    if (hoursAgo < 24) return `${hoursAgo}h`;

    //145 hours / 24 = 6 days 1 hr
    let daysAgo = hoursAgo / 24;

    // obtain the whole number
    daysAgo = Math.floor(daysAgo);

    if (daysAgo < 7) return `${daysAgo}d`;

    // 8 days / 7 = 1 week 1 day
    let weeksAgo = daysAgo / 7;
    weeksAgo = Math.floor(weeksAgo);

    if (weeksAgo < 4) return `${weeksAgo}w`;

    /*
    // 5 weeks / 4 = 1 month 1 week
    let monthsAgo = weeksAgo / 4;
    monthsAgo = Math.floor(monthsAgo);

    if (monthsAgo < 12) return `${monthsAgo}m`;

    // 13 months / 12 = 1 year 1 month
    let yearsAgo = monthsAgo / 12;
    yearsAgo = Math.floor(yearsAgo);

    return `${yearsAgo}y`;
    */

    // return exact date for any time greater than 3 weeks
    let created = new Date(millisecondsAgo);

    let date = created.toLocaleDateString();
    let time = created.toLocaleTimeString();

    return `${date} • ${time}`;
};
