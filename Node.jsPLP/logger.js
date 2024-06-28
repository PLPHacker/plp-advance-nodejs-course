exports.log = {
    console: function(msg) {
        console.log(msg);
    },
    file: function(msg) {
        console.log("Logging to file:", msg);
    }
}