var neo4j   = require('neo4j');
var debug   = require('debug')('neo4j');
var db      = new neo4j.GraphDatabase('http://localhost:7474');
var Promise = require('bluebird');
var Page    = require('./page');

var Website = module.exports = function Website(_node) {
    this._node = _node;
    this.pages = [];
};

Object.defineProperty(Website.prototype, 'id', {
    get: function () {
        return this._node.id;
    }
});

Object.defineProperty(Website.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
});

Website.prototype.contains = function (page) {
    return new Promise(function (resolve, reject) {
        this._node.createRelationshipTo(page._node, 'contains', {}, function (err, rel) {
            if (err) return reject(err);

            resolve();
        });
    }.bind(this));
};

Website.prototype.data = function () {
    var data   = this._node.data;
    data.id    = this._node.id;
    data.pages = this.pages.map(function (page) {
        return page.data();
    });

    return data;
};

Website.get = function (id) {
    var query = [
        'MATCH (website:Website)',
        'WHERE id(website) = {id}',
        'RETURN website'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, { id: parseInt(id) }, function (err, results) {
            if (err) return reject(err);

            var website = new Website(results[0].website);

            resolve(website);
        });
    });
};

Website.findByHostname = function (hostname) {
    var query = [
        'MATCH (website:Website)',
        'WHERE website.hostname = {hostname}',
        'RETURN website'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, { hostname: hostname }, function (err, results) {
            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                return resolve(null);
            }

            var website = new Website(results[0].website);

            resolve(website);
        });
    });
};


/**
 * Fetch all websites.
 *
 * @returns {Promise}
 */
Website.all = function () {
    var query = [
        'MATCH (website:Website) RETURN website'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, null, function (err, results) {
            if (err) return reject(err);

            resolve(results.map(function (result) {
                return (new Website(result['website'])).data();
            }));
        });
    });
};

Website.create = function (data) {
    var query = [
        'CREATE (website:Website {data})',
        'RETURN website'
    ].join('\n');
    var params = { data: data };

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        var node = db.createNode(data);

        var website = new Website(node);

        db.query(query, params, function (err, results) {
            if (err) return reject(err);

            var website = new Website(results[0]['website']);

            resolve(website);
        });
    });
};

Website.delete = function (id) {
    var query = [
        'MATCH (website:Website)',
        'WHERE id(website) = {id}',
        'DELETE website',
        'WITH website',
        'MATCH (website)-[r:contains]-(whatever)',
        'DELETE r'
    ].join('\n')

    var params = {
        id: parseInt(id)
    };

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, params, function (err) {
            if (err) return reject(err);

            resolve(true);
        });
    });
};