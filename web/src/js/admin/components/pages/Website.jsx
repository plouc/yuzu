var React          = require('react/addons');
var Link           = require('react-router').Link;
var Reflux         = require('reflux');
var $              = require('jquery');

var WebsiteActions = require('./../../../core/actions/WebsiteActions');
var PageActions    = require('./../../../core/actions/PageActions');

var WebsiteStore   = require('./../../../core/stores/WebsiteStore');
var PagesStore     = require('./../../../core/stores/PagesStore');

var PageTree       = require('./../PageTree.jsx');
var PageForm       = require('./../forms/PageForm.jsx');

var Website = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            creating: false,
            pageId:   null, // used for new page relation
            website:  null,
            pages:    []
        };
    },

    componentWillMount: function () {
        this.listenTo(WebsiteStore, this._onWebsiteChange);
        this.listenTo(PagesStore,   this._onPagesChange);

        WebsiteActions.get(this.props.params.id);
        PageActions.byWebsite(this.props.params.id);
    },

    render: function () {
        if (null === this.state.website) return (null);

        return (
            <div>
                <div className="page-container">
                    <h1 className="page-title">Website: {this.state.website.name}</h1>
                </div>

                <div className="breadcrumbs">
                    <div className="breadcrumbs__wrapper">
                        <Link to="home">websites</Link>
                        <i className="fa fa-angle-right" />
                        <span>{this.state.website.name}</span>
                    </div>
                </div>

                <div className="page-container">
                    <div className="page-container__wrapper">
                        <div className="page-toolbar">
                            <span className="button button--action" onClick={this._onCreateClick}>
                                <i className="fa fa-plus" />
                                new page
                            </span>
                        </div>
                    </div>
                </div>

                <PageForm expanded={this.state.creating} onSubmit={this._onFormSubmit} onCancel={this._onFormCancel} />

                <div className="page-container">
                    <div className="page-container__wrapper">
                        <h3>Pages</h3>
                        <PageTree onCreateClick={this._onPageCreateClick} website={this.state.website} pages={this.state.pages} />
                    </div>
                </div>
            </div>
        );
    },


    _onWebsiteChange: function (website) {
        this.setState({
            website: website
        });
    },

    _onPagesChange: function (pages) {
        this.setState({
            pages: pages
        });
    },

    _onCreateClick: function () {
        this.setState({
            pageId:   null,
            creating: true
        });
    },

    _onPageCreateClick: function (page) {
        this.setState({
            creating: true,
            pageId:   page.id
        });
    },

    _onFormCancel: function () {
        this.setState({
            creating: false
        });
    },

    _onFormSubmit: function (data) {
        // link to page or website
        if (this.state.pageId) {
            data.parentPageId = this.state.pageId;
        } else {
            data.websiteId = this.state.website.id;
        }

        PageActions.create(data);
        this.setState({
            creating: false
        });
    }
});

module.exports = Website;