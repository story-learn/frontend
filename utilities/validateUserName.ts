// https://unix.stackexchange.com/questions/391866/regex-for-password-restricting-special-characters

/**
 * validateUserName function checks if a username is valid.
 * It allows letters, numbers and @.+-_ only.
 * @param userName - username to verify
 * @returns boolean
 * @example validateUserName("Bikky_Blexxy")
 */
export const validateUserName = (userName: string) => {
    // allow letters, numbers and @.+-_ only
    let regex = /(?=[\da-zA-Z@.+-_]$)/;
    return regex.test(userName);
};
