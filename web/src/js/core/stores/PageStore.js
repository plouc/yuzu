var Reflux      = require('reflux');
var $           = require('jquery');
var PageActions = require('./../actions/PageActions');

var PageStore = Reflux.createStore({
    init: function () {
        this.listenTo(PageActions.get, this.getPage);
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
    }
});

module.exports = PageStore;
