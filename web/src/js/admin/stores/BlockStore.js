var invariant    = require('react/lib/invariant');
var EventEmitter = require('events').EventEmitter;
var $            = require('jquery');

var CHANGE_EVENT = 'change';
var _events      = new EventEmitter;

function notifyChange() {
    _events.emit(CHANGE_EVENT);
}

var _blocks       = [];
var _currentBlock = null;

var BlockStore = {
    addChangeListener: function (listener) {
        _events.addListener(CHANGE_EVENT, listener);
    },

    removeChangeListener: function (listener) {
        _events.removeListener(CHANGE_EVENT, listener);
    },

    removeAllChangeListeners: function () {
        _events.removeAllListeners(CHANGE_EVENT);
    },

    fetchPageBlocks: function (id, params) {
        $.ajax({
            url:  '/api/pages/' + id + '/blocks',
            data: params || {}
        })
            .then(function (data) {
                _blocks = data;
                notifyChange();
            }.bind(this))
        ;
    },

    fetchBlock: function (id, params) {
        $.ajax({
            url:  '/api/blocks/' + id,
            data: params || {}
        })
            .then(function (data) {
                _currentBlock = data;
                notifyChange();
            }.bind(this))
        ;
    },

    getCurrentBlock: function () {
        return _currentBlock;
    },

    getBlocks: function () {
        return _blocks;
    }
};

module.exports = BlockStore;
