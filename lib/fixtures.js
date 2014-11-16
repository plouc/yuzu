var neo4j   = require('neo4j');
var db      = new neo4j.GraphDatabase('http://localhost:7474');
var moment  = require('moment');
var Website = require('./models/website');
var Page    = require('./models/page');
var Block   = require('./models/block');

module.exports = {
    load: function (websiteCount) {
        db.query('MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r', null, function (err, res) {
            var i = 0;
            while (i < websiteCount) {
                Website.create({
                    name:     'Tech blog ' + i,
                    hostname: 'yuzu.io'
                }).then(function (website) {
                    Page.create({ name: 'Homepage', url: '/' }).then(function (homepage) {
                        website.contains(homepage);
                        Promise.all([
                                Page.create({ name: 'javascript', url: 'javascript' }),
                                Page.create({ name: 'php',        url: 'php' }),
                                Page.create({ name: 'golang',     url: 'golang' })
                            ]).then(function (pages) {
                            pages.forEach(function (page) {
                                homepage.parentOf(page);
                            });

                            Block.create({
                                name: 'test block ' + i,
                                type: 'text'
                            }).then(function (testSharedBlock) {
                                var from = moment();
                                var to   = from.clone().add(7, 'd');
                                pages.forEach(function (page) {
                                    page.addBlock(testSharedBlock, from.valueOf(), to.valueOf());
                                });

                                from.subtract(1, 'y');
                                to.subtract(1, 'y');
                                pages.forEach(function (page) {
                                    page.addBlock(testSharedBlock, from.valueOf(), to.valueOf());
                                });
                            });

                            Page.create({ name: 'golang channels', url: '/golang-channels' }).then(function (channels) {
                                pages[2].parentOf(channels);
                                Page.create({ name: 'Design patterns', url: '/design-patterns' }).then(function (designPatterns) {
                                    channels.parentOf(designPatterns);
                                    pages[0].parentOf(designPatterns);
                                    pages[1].parentOf(designPatterns);

                                    Page.create({ name: 'Inversion Of Control', url: '/inversion-of-control' }).then(function (ioc) {
                                        pages[0].parentOf(ioc);
                                        pages[1].parentOf(ioc);
                                    });
                                });
                            });
                        });
                    });

                    Page.create({ name: 'About', url: '/about' }).then(function (about) {
                        website.contains(about);
                    });
                });
                i++;
            }
        })
    }
};
