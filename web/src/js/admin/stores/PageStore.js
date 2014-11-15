var invariant    = require('react/lib/invariant');
var EventEmitter = require('events').EventEmitter;
var $            = require('jquery');

var CHANGE_EVENT = 'change';
var _events      = new EventEmitter;

function notifyChange() {
    _events.emit(CHANGE_EVENT);
}

var _pages       = [];
var _currentPage = null;

var PageStore = {
    addChangeListener: function (listener) {
        _events.addListener(CHANGE_EVENT, listener);
    },

    removeChangeListener: function (listener) {
        _events.removeListener(CHANGE_EVENT, listener);
    },

    removeAllChangeListeners: function () {
        _events.removeAllListeners(CHANGE_EVENT);
    },

    fetchWebsitePages: function (id, params) {
        $.ajax({
            url:  '/api/websites/' + id + '/pages',
            data: params || {}
        })
            .then(function (data) {
                _pages = data;
                notifyChange();
            }.bind(this))
        ;
    },

    create: function (data) {
        return $.ajax({
            url:  '/api/pages',
            data: data,
            type: 'POST'
        })
            .then(function (resp) {
            })
        ;
    },

    fetchPages: function (params) {
        $.ajax({
            url:  '/api/pages',
            data: params || {}
        })
            .then(function (data) {
                _pages = data;
                notifyChange();
            }.bind(this))
        ;
    },

    fetchPage: function (id, params) {
        $.ajax({
            url:  '/api/pages/' + id,
            data: params || {}
        })
            .then(function (data) {
                _currentPage = data;
                notifyChange();
            }.bind(this))
        ;
    },

    getPages: function () {
        return _pages;
    },

    getCurrentPage: function () {
        return _currentPage;
    }
};

module.exports = PageStore;
