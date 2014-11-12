var neo4j   = require('neo4j');
var db      = new neo4j.GraphDatabase('http://localhost:7474');
var Promise = require('bluebird');


var BlockManager = {};

BlockManager.save = function (block) {
    var query = [
        'CREATE (block:Block {data})',
        'RETURN block'
    ].join('\n');

    var data = {};
    Object.keys(block.settings).forEach(function (key) {
        settings['setting_' + key] = block.settings[key];
        /*
        if (key.indexOf('setting_') === 0) {
            settings[key.substring(7)] = block[key];
        }
        */
    });
    data.type = block.type;

    var params = { data: data };

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