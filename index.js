var koa        = require('koa');
var json       = require('koa-json');
var mount      = require('koa-mount');
var cors       = require('koa-cors');
var static     = require('koa-static');
var bodyParser = require('koa-bodyparser');
var views      = require('co-views');
var hostMount  = require('./lib/mount/hostname-mount');
var Router     = require('koa-router');
var path       = require('path');
var app        = koa();

var Page = require('./lib/models/page');

//require('./lib/fixtures').load(1);

app.proxy = true;
app.use(json());
app.use(cors());
app.use(bodyParser());

var frontApp = koa();

var render = views(path.join(__dirname, 'templates'), {
    map: { html: 'swig' }
});

frontApp.use(static('web/frontend'));

frontRouter = new Router();
frontRouter.get('/', function *() {

    var urls = yield Page.urlsForWebsite(this.website.id);

    this.body = yield render('index', {
        'website': this.website.data(),
        'urls':    urls
    });
});

frontApp.use(mount('/', frontRouter.middleware()));

app.use(hostMount(frontApp));

app.use(static('web/admin'));

var apiRouter = require('./lib/api/router');
app.use(mount('/api', apiRouter.middleware()));

app.listen(3000);
