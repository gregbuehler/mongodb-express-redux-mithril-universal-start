
var formatDate = module.exports = function(dateString) {
        if (dateString) {
            //format date as yyyy-mm-dd
            // return dateString.substring(0, 10);

            //format date as yyyy-mm-dd hh:nn
            return dateString.substring(0, 16).replace('T', ' ');
        }
    }
    //---------------------------------------------
    // //format date as yyyy-mm-dd
    // var formatDate = module.exports = function(date) {
    //     return date.toISOString().substring(0, 10);
    // }
