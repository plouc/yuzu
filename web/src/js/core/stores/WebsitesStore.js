var Reflux         = require('reflux');
var $              = require('jquery');
var WebsiteActions = require('./../actions/WebsiteActions');

var WebsitesStore = Reflux.createStore({
    init: function () {
        this.listenTo(WebsiteActions.all, this.getWebsites);
    },

    getWebsites: function (params) {
        $.ajax({
            url:  '/api/websites',
            data: params || {}
        })
            .then(function (websites) {
                this.trigger(websites);
            }.bind(this))
        ;
    }
});

module.exports = WebsitesStore;
