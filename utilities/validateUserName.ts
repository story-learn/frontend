// https://unix.stackexchange.com/questions/391866/regex-for-password-restricting-special-characters

export const validateUserName = (userName: string) => {
    // allow letters, numbers and @.+-_ only
    let regex = /(?=[\da-zA-Z@.+-_]$)/;
    return regex.test(userName);
};
