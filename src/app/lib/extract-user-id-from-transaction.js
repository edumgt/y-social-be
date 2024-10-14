export const extractUserIdFromTransaction = (inputString) => {
    const match = inputString.match(/TK USER (\w{24})/);
    return match ? match[1] : null;
};
