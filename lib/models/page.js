var neo4j   = require('neo4j');
var debug   = require('debug')('neo4j');
var Promise = require('bluebird');
var _       = require('lodash');
var db      = new neo4j.GraphDatabase('http://localhost:7474');
var Block   = require('./block');
var Website = require('./website');

var Page = module.exports = function Page(_node) {
    this._node  = _node;
    this.blocks = [];
};

Object.defineProperty(Page.prototype, 'id', {
    get: function () {
        return this._node.id;
    }
});

Object.defineProperty(Page.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
});

Page.prototype.parentOf = function (page) {
    return new Promise(function (resolve, reject) {
        this._node.createRelationshipTo(page._node, 'parent_of', {}, function (err, relation) {
            if (err) return reject(err);

            resolve(relation);
        });
    }.bind(this));
};

Page.prototype.addBlock = function (block, from, to) {
    return new Promise(function (resolve, reject) {
        this._node.createRelationshipTo(block._node, 'composed_of', {
            from: from,
            to:   to
        }, function (err, relation) {
            if (err) return reject(err);

            resolve(relation);
        });
    }.bind(this));
};

Page.prototype.data = function () {
    var data    = this._node.data;
    data.id     = this._node.id;
    data.blocks = this.blocks.map(function (block) {
        return block.data();
    });

    return data;
};

Page.forWebsite = function (id) {
    var query = [
        'MATCH (website:Website)-[r:contains|parent_of*]->(child:Page)',
        'WHERE id(website) = {id}',
        'OPTIONAL MATCH (parent:Page)-[:parent_of]->(child)',
        'RETURN parent, child'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, { id: parseInt(id) }, function (err, results) {
            if (err) return reject(err);

            var pages = [];

            results = _.uniq(results, function (result) {
                return (result.parent ? result.parent.id : '-') + '-' + result.child.id;
            });


            function getChildPages(pageId, results) {
                var childPages = [];
                results.forEach(function (result) {
                   if (result.parent && result.parent.id === pageId) {
                       var pageData = result.child.data;
                       pageData.id = result.child.id;
                       pageData.pages = getChildPages(pageData.id, results);
                       childPages.push(pageData);
                   }
                });

                return childPages;
            }

            // get top level pages
            results.forEach(function (result) {
                if (!result.parent) {
                    var pageData = result.child.data;
                    pageData.id = result.child.id;
                    pageData.pages = getChildPages(pageData.id, results);
                    pages.push(pageData);
                }
            });

            resolve(pages);
        });
    });
};

Page.all = function () {
    var query = [
        'MATCH (page:Page) RETURN page'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, null, function (err, results) {
            if (err) return reject(err);

            resolve(results.map(function (result) {
                return (new Page(result['page'])).data();
            }));
        });
    });
};

Page.get = function (id) {
    var query = [
        'MATCH (page:Page)',
        'WHERE id(page) = {id}',
        'RETURN page'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, { id: parseInt(id) }, function (err, results) {
            if (err) return reject(err);

            var page = new Page(results[0].page);

            resolve(page);
        });
    });
};

/**
 * Creates a new Page.
 *
 * @param {Object} data
 * @returns {Promise}
 */
Page.create = function (data) {

    var websiteId;
    if (data.websiteId) {
        websiteId = parseInt(data.websiteId);
        delete data.websiteId;
    }

    var parentPageId;
    if (data.parentPageId) {
        parentPageId = parseInt(data.parentPageId);
        delete data.parentPageId;
    }

    // crafting the base query
    var query  = [ 'CREATE (page:Page {data})' ];
    var params = { data: data };
    var ret    = [ 'page' ];

    // if websiteId provided, creates the relation
    if (websiteId) {
        query.unshift(
            'MATCH (website:Website)',
            'WHERE id(website) = {websiteId}'
        );
        query.push('CREATE (website)-[r:contains]->(page)');
        ret.unshift('r');

        params.websiteId = websiteId;
    }

    // if parentPageId provided, creates the relation
    if (parentPageId) {
        query.unshift(
            'MATCH (parent:Page)',
            'WHERE id(parent) = {parentId}'
        );
        query.push('CREATE (parent)-[r:parent_of]->(page)');
        ret.unshift('r');

        params.parentId = parentPageId;
    }

    query.push('RETURN ' + ret.join(', '));

    var queryString = query.join('\n');

    debug('OH YEAH');
    debug(queryString.replace(/(?:\r\n|\r|\n)/g, ' '));

    console.log('BEFORE');

    return new Promise(function (resolve, reject) {
        var node = db.createNode(data);
        var page = new Page(node);

        console.log('IN');
        db.query(queryString, params, function (err, results) {
            console.log('BEFORE ERROR', results);
            if (err) {
                console.log(err);
            }

            if (err) return reject(err);

            var page = new Page(results[0]['page']);

            console.log('BEFORE RESOLVE');
            resolve(page);
        });
    });
};