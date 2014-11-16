var React         = require('react/addons');
var Router        = require('react-router');
var Routes        = Router.Routes;
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect      = Router.Redirect;
var Link          = Router.Link;
var Page          = require('./components/Page.jsx');

var routes = appConfig.urls.map(function (url) {
    return <Route key={url.id} path={url.url} handler={Page} pageId={url.id} />
});

React.render((
    <Routes location="hash">
        {routes}
    </Routes>
), document.getElementById('page'));