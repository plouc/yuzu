var Block = require('./../../models/block');

module.exports = {
    one: function *() {
        var block = yield Block.get(this.params.id);
        this.body = block.data();
    },

    page: function *() {
        this.body = yield Block.byPage(this.params.id);
    }
};