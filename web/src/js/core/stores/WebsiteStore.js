var Reflux         = require('reflux');
var $              = require('jquery');
var WebsiteActions = require('./../actions/WebsiteActions');

var WebsiteStore = Reflux.createStore({
    init: function () {
        this.listenTo(WebsiteActions.get,    this.getWebsite);
        this.listenTo(WebsiteActions.create, this.createWebsite);
        this.listenTo(WebsiteActions.delete, this.deleteWebsite);
    },

    getWebsite: function (id, params) {
        $.ajax({
            url:  '/api/websites/' + id,
            data: params || {}
        })
            .then(function (website) {
                this.trigger(website);
            }.bind(this))
        ;
    },

    createWebsite: function (data) {
        $.ajax({
            url:  '/api/websites',
            data: data,
            type: 'POST'
        })
            .then(function () {
                this.trigger(true);
                WebsiteActions.all();
            }.bind(this))
        ;
    },

    deleteWebsite: function (id) {
        $.ajax({
            url:  '/api/websites/' + id,
            type: 'DELETE'
        })
            .then(function (data) {
                this.trigger(true);
                WebsiteActions.all();
            }.bind(this))
        ;
    }
});

module.exports = WebsiteStore;