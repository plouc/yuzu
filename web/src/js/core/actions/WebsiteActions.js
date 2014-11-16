var Reflux = require('reflux');

var WebsiteActions = Reflux.createActions([
    'all',
    'create',
    'get',
    'delete'
]);

module.exports = WebsiteActions;