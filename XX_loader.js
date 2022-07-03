export const loaderDisplay = function (onOrOff) {
    const loader = document.querySelector('.loader');

    if (onOrOff === "on") {
        loader.classList.remove("hide");
    } else if (onOrOff === "off") {
        loader.classList.add("hide");
    }
}