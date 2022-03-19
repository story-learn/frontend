let passwordRegex = {
    "uppercase": /(?=.*?[A-Z])/,
    "lowercase": /(?=.*?[a-z])/,
    "digit": /(?=.*?[0-9])/,
    "specialCharacter": /(?=.*?[?!@$%^&*-])/,
    "all": /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};

/**
 * validatePassword function checks if a password contains uppercase, lowercase, digit, and special characters.
 * @param {string} password password to validate
 * @returns {boolean | null} any of the condition not met or null
 */

export const validatePassword = (password: string): string | null => {
    if (!passwordRegex["uppercase"].test(password))
        return `Password must contain at least 1 uppercase letter`;

    if (!passwordRegex["lowercase"].test(password))
        return `Password must contain at least 1 lowercase letter`;

    if (!passwordRegex["digit"].test(password))
        return `Password must contain at least 1 number`;

    if (!passwordRegex["specialCharacter"].test(password))
        return `Password must contain one special character`;

    if (password.length < 8)
        return `Password must be at least 8 characters long`;

    return null;
};
