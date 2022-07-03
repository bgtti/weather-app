//Helper function that capitalizes the first letter of a string
export const firstLetterUppercase = function (string) {
    let firstLetter = String.prototype.toUpperCase.call(string.charAt(0));
    let restOfString = String.prototype.toLocaleLowerCase.call(string.slice(1));
    let newString = firstLetter + restOfString;
    return newString
}
