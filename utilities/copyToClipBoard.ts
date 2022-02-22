export const copyToClipBoard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        throw new Error("An error Occured");
    }
};
