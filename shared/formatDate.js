var type;
var formatDate = module.exports = function(date) {

        type = typeof date;

        if (type === 'object') {

            return date.toISOString().substring(0, 16).replace('T', ' ');

        } else if (type === 'string') {

            return date.substring(0, 16).replace('T', ' ');
        }
    }

