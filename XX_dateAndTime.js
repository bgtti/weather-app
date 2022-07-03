//Helper functions for date and time

//*** TIME HANDLING FUNCTION ****
//accepts a unix timestamp and outputs the time
//time output in 12 or 24 hour format or format according to user's browser settings. Time output = HH:MM
//1 necessary parameter (date object or unix value) and 1 optional parameter: hour format
//the second parameter can be "12" (for AM/PM), "24" (for 24-hr clock), "H-12" (for HH AM/PM), or "local" to set according to user's browser.
//if there is no second argument, the function will return the time in 12-hr clock format
function timeFormat(timestamp, mode) {
    if ((typeof timestamp === "undefined") || (arguments.length === 0)) {
        console.error("timeFormat function has no arguments.")
        return
    } else if (parseInt(timestamp) === NaN) {
        console.error("timeFormat function requires a valid unix value as an argument")
        return
    } else {
        let date = timestamp;
        if (typeof date === 'string') {
            date = parseInt(date);
        }
        date = new Date(date * 1000);
        let time;
        if (mode === "12" || mode === 12 || arguments.length === 1) {
            time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        } else if (mode === "24" || mode === 24) {
            time = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour24: true })
        } else if (mode === "local") {
            time = date.toLocaleString({ hour: 'numeric', minute: 'numeric' })
        } else if (mode === "H-12") {
            time = date.toLocaleString('en-GB', { hour: 'numeric', hour12: true })
        } else if (arguments.length === 0) {
            console.error("Date object missing: timeFormat needs an argument")
        } else {
            console.error("Oops: something went wrong with timeFormat.")
        }
        return time;
    }
}

//Testing the timeFormat function (uncomment bellow):
// let unixDate = "1654881043291";
// let anotherUnixDate = parseInt(unixDate);

// console.log("test " + timeFormat(unixDate))
// console.log("test " + timeFormat(anotherUnixDate))
// console.log("test " + timeFormat("hello"))
// console.log("test " + timeFormat("1656864000"))
// console.log("test " + timeFormat("1656867600"))
// console.log("test " + timeFormat("1656871200"))
// console.log("test " + timeFormat("1656874800"))
// console.log("test " + timeFormat("1656878400", "H-12"))
// console.log("test " + timeFormat())

//*** DATE HANDLING FUNCTION ***
//the displayDate function takes two arguments: 1 required (the date in unix format), another optional (format to be displayed)
//the first argument accepts a date object or unix timestamp
// the second argument accepts: WDMY (eg: Sunday, 03 July 2022), WDM (eg: Sunday, 03 July), DMY (03 July 2022), DM (03 Jul), W (eg: Sun), 
function dateFormat(timestamp, format) {
    if ((typeof timestamp === "undefined") || (arguments.length === 0)) {
        console.error("displayDate function has no arguments.")
        return
    } else if (parseInt(timestamp) === NaN) {
        console.error("timeFormat function requires a valid unix value as an argument")
        return
    } else {
        let date = timestamp;
        if (typeof date === 'string') {
            date = parseInt(date);
        };
        date = new Date(date * 1000);

        if (format === "WDMY" || arguments.length === 1) {
            date = date.toLocaleString('en-GB', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
        } else if (format === "WDM") {
            date = date.toLocaleString('en-GB', { weekday: 'long', day: '2-digit', month: 'long' })
        } else if (format === "DMY") {
            date = date.toLocaleString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
        } else if (format === "DM") {
            date = date.toLocaleString('en-GB', { day: '2-digit', month: 'short', })
        } else if (format === "W") {
            date = date.toLocaleString('en-GB', { weekday: 'short' })
        }
        return date
    }
}
//Testing the timeFormat function (uncomment bellow):
// let unixDate = "1654881043291";
// let anotherUnixDate = parseInt(unixDate);

// console.log("test " + dateFormat(unixDate));
// console.log("test " + dateFormat(anotherUnixDate, "DMY"));


//Resources
// date toLocaleString(): https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_date_all
// date methods: https://www.w3schools.com/js/js_date_methods.asp
// converting unix to date: https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
// toLocaleString constructor documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

export {
    timeFormat,
    dateFormat
}