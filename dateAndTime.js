//Global Variables
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysOfWeekAbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//Time handling function
//accepts a date object or unix timestamp and outputs the time
//time output in 12 or 24 hour format or format according to user's browser settings. Time output = HH:MM
//1 necessary parameter (date object or unix value) and 1 optional parameter: hour format
//the second parameter can be "12" (for AM/PM), "24" (for 24-hr clock), or "local" to set according to user's browser.
function timeFormat(dateOrTimestamp, mode) {
    let date = dateOrTimestamp;
    if ((!date.getHours || date.getHours() === "NaN") && (!new Date(parseInt(date)).getHours() || new Date(parseInt(date)).getHours() === "NaN")) {
        console.error("timeFormat requires a valid date as an argument")
        return
    }
    if (typeof date === 'string') {
        date = parseInt(date);
    };
    date = new Date(date);

    let time;
    if (mode === "12" || arguments.length === 1) {
        time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    } else if (mode === "24") {
        time = date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour24: true })
    } else if (mode === "local") {
        time = date.toLocaleString({ hour: 'numeric', minute: 'numeric' })
    } else if (arguments.length === 0) {
        console.error("Date object missing: timeFormat needs an argument")
    } else {
        console.error("Oops: something went wrong with timeFormat.")
    }
    return time;
}

//Testing:
let date = new Date();
let whatev = new Date().getTime();;
let mimi = "1654881043291";
let mi2 = parseInt(mimi);

console.log("test " + timeFormat(date))
console.log("test " + timeFormat(whatev))
console.log("test " + timeFormat(mimi))
console.log("test " + timeFormat(mi2))
console.log("test " + timeFormat())
console.log("test " + timeFormat("hello"))


//resources
// date toLocaleString(): https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_tolocalestring_date_all
// date methods: https://www.w3schools.com/js/js_date_methods.asp
// converting unix to date: https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript