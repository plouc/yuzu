var compose = require('koa-compose');
var assert  = require('assert');
var debug   = require('debug')('router');
var Website = require('./../models/website');

/**
 * Expose `mount()`.
 */

module.exports = mount;

/**
 * Mount `app` with `prefix`, `app`
 * may be a Koa application or
 * middleware function.
 *
 * @param {String|Application|Function} prefix, app, or function
 * @param {Application|Function} [app or function]
 * @return {Function}
 * @api public
 */

function mount(prefix, app) {
    if ('string' != typeof prefix) {
        app = prefix;
    }

    // compose
    var downstream = app.middleware
        ? compose(app.middleware)
        : app;

    return function *(upstream) {

        debug('1. enter hostname: %s', this.request.hostname);

        debug('2. searching website by hostname: %s', this.request.hostname);
        var website = yield Website.findByHostname(this.request.hostname)
            .then(function (website) {
                return website;
            });

        if (!website) {
            debug('3. no website found');
            return yield* upstream;
        }

        debug('3. found website', website.data().name);
        this.website = website;

        yield* downstream.call(this, function *() {
            yield* upstream;
        }.call(this));

        debug('4. leave hostname: %s', this.request.hostname);
    };
}
