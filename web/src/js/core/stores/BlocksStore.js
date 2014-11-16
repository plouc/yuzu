var Reflux       = require('reflux');
var $            = require('jquery');
var BlockActions = require('./../actions/BlockActions');

var BlocksStore = Reflux.createStore({
    init: function () {
        this.listenTo(BlockActions.byPage, this.getPageBlocks);
    },

    getPageBlocks: function (id, params) {
        $.ajax({
            url:  '/api/pages/' + id + '/blocks',
            data: params || {}
        })
            .then(function (blocks) {
                this.trigger(blocks);
            }.bind(this))
        ;
    }
});

module.exports = BlocksStore;
