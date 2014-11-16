var Router = require('koa-router');
var routes = require('./routes');

var apiRouter = new Router();
apiRouter
    // websites
    .get('/websites',                routes.websites.all)
    .post('/websites',               routes.websites.create)
    .delete('/websites/:id',         routes.websites.delete)
    .get('/websites/:id',            routes.websites.one)

    // pages
    .get('/pages',                   routes.pages.all)
    .post('/pages',                  routes.pages.create)
    .get('/pages/:id',               routes.pages.one)
    .get('/websites/:id/pages-urls', routes.pages.websiteUrls)
    .get('/websites/:id/pages',      routes.pages.website)

    // blocks
    .get('/blocks/:id',              routes.blocks.one)
    .get('/pages/:id/blocks',        routes.blocks.page)
;


module.exports = apiRouter;