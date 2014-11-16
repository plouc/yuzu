var Reflux = require('reflux');

var PageActions = Reflux.createActions([
    'create',
    'get',
    'all',
    'byWebsite'
]);

module.exports = PageActions;