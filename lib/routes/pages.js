var Page = require('./../models/page');

module.exports = {
    all: function *() {
        this.body = yield Page.all();
    },

    one: function *() {
       var page = yield Page.get(this.params.id);
       this.body = page.data();
    },

    create: function *() {
        Page.create(this.request.body);
        this.body = { ok: true };
    },

    website: function *() {
        this.body = yield Page.forWebsite(this.params.id);
    }
};