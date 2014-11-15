var invariant    = require('react/lib/invariant');
var EventEmitter = require('events').EventEmitter;
var $            = require('jquery');

var CHANGE_EVENT = 'change';
var _events      = new EventEmitter;

function notifyChange() {
    _events.emit(CHANGE_EVENT);
}

var _websites       = [];
var _currentWebsite = null;

var WebsiteStore = {
    addChangeListener: function (listener) {
        _events.addListener(CHANGE_EVENT, listener);
    },

    removeChangeListener: function (listener) {
        _events.removeListener(CHANGE_EVENT, listener);
    },

    removeAllChangeListeners: function () {
        _events.removeAllListeners(CHANGE_EVENT);
    },

    delete: function (id) {
        return $.ajax({
            url:  '/api/websites/' + id,
            type: 'DELETE'
        })
        .then(function (data) {
            this.fetchWebsites();
        }.bind(this));
    },

    create: function (data) {
        return $.ajax({
            url:  '/api/websites',
            data: data,
            type: 'POST'
        });
    },

    fetchWebsites: function (params) {
        $.ajax({
            url:  '/api/websites',
            data: params || {}
        })
        .then(function (data) {
            _websites = data;
            notifyChange();
        }.bind(this));
    },

    fetchWebsite: function (id, params) {
        $.ajax({
            url:  '/api/websites/' + id,
            data: params || {}
        })
            .then(function (data) {
                _currentWebsite = data;
                notifyChange();
            }.bind(this))
        ;
    },

    getWebsites: function () {
        return _websites;
    },

    getCurrentWebsite: function () {
        return _currentWebsite;
    }
};

module.exports = WebsiteStore;
