//format date as yyyy-mm-dd
var formatDate = module.exports = function(dateString) {
        if (dateString) {
            // return dateString.substring(0, 10);
            return dateString.substring(0, 16).replace('T', ' ');
        }
    }
    //---------------------------------------------
    // //format date as yyyy-mm-dd
    // var formatDate = module.exports = function(date) {
    //     return date.toISOString().substring(0, 10);
    // }
