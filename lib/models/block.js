var neo4j   = require('neo4j');
var debug   = require('debug')('neo4j');
var db      = new neo4j.GraphDatabase('http://localhost:7474');
var Promise = require('bluebird');
var _       = require('lodash');


var Block = module.exports = function Block(_node) {
    this._node = _node;
};

Object.defineProperty(Block.prototype, 'id', {
    get: function () {
        return this._node.id;
    }
});

Object.defineProperty(Block.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
});

Block.prototype.data = function () {
    var data = this._node.data;
    data.id  = this._node.id;

    return data;
};

Block.get = function (id) {
    var query = [
        'MATCH (block:Block)',
        'WHERE id(block) = {id}',
        'RETURN block'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, { id: parseInt(id) }, function (err, results) {
            if (err) return reject(err);

            var block = new Block(results[0].block);

            resolve(block);
        });
    });
};

Block.byPage = function (id) {
    var query = [
        'MATCH (block:Block)<-[r:composed_of]-(page:Page)',
        'WHERE id(page) = {id}',
        'RETURN r, block'
    ].join('\n');

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        db.query(query, { id: parseInt(id) }, function (err, results) {
            if (err) {
                return reject(err);
            }

            if (results.length === 0) {
                return resolve([]);
            }

            var blocks = results.map(function (row) {
                var block = new Block(row.block);

                return block.data();
            });

            resolve(blocks);
        });
    });
};


Block.create = function (data, callback) {
    var query = [
        'CREATE (block:Block {data})',
        'RETURN block'
    ].join('\n');
    var params = { data: data };

    debug(query.replace(/(?:\r\n|\r|\n)/g, ' '));

    return new Promise(function (resolve, reject) {
        var node = db.createNode(data);

        var block = new Block(node);

        db.query(query, params, function (err, results) {
            if (err) {
                reject(err);
            } else {
                var block = new Block(results[0]['block']);

                resolve(block);
            }
        });
    });
};