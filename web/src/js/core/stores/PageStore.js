var Reflux      = require('reflux');
var $           = require('jquery');
var PageActions = require('./../actions/PageActions');

var PageStore = Reflux.createStore({
    init: function () {
        this.listenTo(PageActions.get,    this.getPage);
        this.listenTo(PageActions.create, this.createPage);
    },

    getPage: function (id, params) {
        $.ajax({
            url:  '/api/pages/' + id,
            data: params || {}
        })
            .then(function (page) {
                this.trigger(page);
            }.bind(this))
        ;
    },

    createPage: function (data) {
        $.ajax({
            url:  '/api/pages',
            data: data,
            type: 'POST'
        })
            .then(function () {
                if (data.websiteId) {
                    PageActions.byWebsite(data.websiteId);
                } else {
                    PageActions.all();
                }
            }.bind(this))
        ;
    }
});

module.exports = PageStore;
