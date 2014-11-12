var Website = require('./../models/website');

module.exports = {
    all: function *() {
        this.body = yield Website.all();
    },

    one: function *() {
        var website = yield Website.get(this.params.id);
        this.body = website.data();
    },

    create: function *() {
        Website.create(this.request.body);
        this.body = { ok: true };
    },

    delete: function *() {
        var removed = yield Website.delete(this.params.id);
        this.body = { ok: true };
    }
};