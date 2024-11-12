function Log(message) {
    let logMsg = `${new Date().toLocaleString("nl-BE", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })} : ${message}`;
    console.log(logMsg);
}

module.exports = { Log }