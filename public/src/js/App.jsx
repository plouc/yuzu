var React         = require('react/addons');
var Router        = require('react-router');
var Routes        = Router.Routes;
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect      = Router.Redirect;
var Link          = Router.Link;

var Websites = React.createFactory(require('./components/pages/Websites.jsx'));
var Website  = React.createFactory(require('./components/pages/Website.jsx'));
var Pages    = React.createFactory(require('./components/pages/Pages.jsx'));
var Page     = React.createFactory(require('./components/pages/Page.jsx'));
var Block    = React.createFactory(require('./components/pages/Block.jsx'));

var App = React.createClass({
    render: function () {
        return (
            <div>
                <div className="main-nav">
                    <nav className="main-nav__wrapper">
                        <Link className="main-nav__item" to="home">Websites</Link>
                        <Link className="main-nav__item" to="pages">Pages</Link>
                    </nav>
                </div>
                {this.props.activeRouteHandler()}
            </div>
        );
    }
});

React.render((
    <Routes location="hash">
        <Route name="home" path="/" handler={App}>
            <DefaultRoute handler={Websites} />
            <Route name="pages"          path="/pages"                                        handler={Pages} />
            <Route name="website"        path="/websites/:id"                                 handler={Website} />
            <Route name="page"           path="/pages/:id"                                    handler={Page} />
            <Route name="page_block"     path="/websites/:websiteId/pages/:pageId/blocks/:id" handler={Block} />
        </Route>
        <NotFoundRoute handler={App} />
    </Routes>
), document.body);