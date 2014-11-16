var Reflux       = require('reflux');
var $            = require('jquery');
var BlockActions = require('./../actions/BlockActions');

var BlockStore = Reflux.createStore({
    init: function () {
        this.listenTo(BlockActions.get, this.getBlock);
    },

    getBlock: function (id, params) {
        $.ajax({
            url:  '/api/blocks/' + id,
            data: params || {}
        })
            .then(function (block) {
                this.trigger(block);
            }.bind(this))
        ;
    }
});

module.exports = BlockStore;