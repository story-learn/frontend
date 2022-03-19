/**
 * copies a particular input to clipboad
 * @param {string} text what to copy to clipboard
 */

export const copyToClipBoard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        throw new Error("An error Occured");
    }
};
