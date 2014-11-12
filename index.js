var koa        = require('koa');
var json       = require('koa-json');
var Router     = require('koa-router');
var mount      = require('koa-mount');
var cors       = require('koa-cors');
var static     = require('koa-static');
var bodyParser = require('koa-bodyparser');
var routes     = require('./lib/routes');
var app        = koa();

require('./lib/fixtures').load(1);

app.use(static('public'));
app.use(json());
app.use(cors());
app.use(bodyParser());

var apiRouter = new Router();
apiRouter
    // websites
    .get('/websites',           routes.websites.all)
    .post('/websites',          routes.websites.create)
    .delete('/websites/:id',    routes.websites.delete)
    .get('/websites/:id',       routes.websites.one)

    // pages
    .get('/pages',              routes.pages.all)
    .post('/pages',             routes.pages.create)
    .get('/pages/:id',          routes.pages.one)
    .get('/websites/:id/pages', routes.pages.website)

    // blocks
    .get('/blocks/:id',         routes.blocks.one)
    .get('/pages/:id/blocks',   routes.blocks.page)
;

app.use(mount('/api', apiRouter.middleware()));

app.listen(3000);
