var Reflux      = require('reflux');
var $           = require('jquery');
var PageActions = require('./../actions/PageActions');

var PagesStore = Reflux.createStore({
    init: function () {
        this.listenTo(PageActions.all,       this.getPages);
        this.listenTo(PageActions.byWebsite, this.getWebsitePages);
    },

    getPages: function (params) {
        $.ajax({
            url:  '/api/pages',
            data: params || {}
        })
            .then(function (data) {
                this.trigger(data);
            }.bind(this))
        ;
    },

    getWebsitePages: function (id, params) {
        $.ajax({
            url:  '/api/websites/' + id + '/pages',
            data: params || {}
        })
            .then(function (data) {
                this.trigger(data);
            }.bind(this))
        ;
    }
});

module.exports = PagesStore;
