var React        = require('react/addons');
var $            = require('jquery');
var Link         = require('react-router').Link;
var WebsiteStore = require('./../../stores/WebsiteStore');
var PageStore    = require('./../../stores/PageStore');
var BlockStore   = require('./../../stores/BlockStore');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            website: WebsiteStore.getCurrentWebsite(),
            page:    PageStore.getCurrentPage(),
            block:   null
        };
    },

    handleWebsiteChange: function () {
        this.setState({
            website: WebsiteStore.getCurrentWebsite()
        });
    },

    handlePageChange: function () {
        this.setState({
            page: PageStore.getCurrentPage()
        });
    },

    handleBlockChange: function () {
        this.setState({
            block: BlockStore.getCurrentBlock()
        });
    },

    componentWillUnmount: function () {
        WebsiteStore.removeChangeListener(this.handleWebsiteChange);
        PageStore.removeChangeListener(this.handlePageChange);
        BlockStore.removeChangeListener(this.handleBlockChange);
    },

    componentDidMount: function () {
        WebsiteStore.addChangeListener(this.handleWebsiteChange);
        WebsiteStore.fetchWebsite(this.props.params.websiteId);

        PageStore.addChangeListener(this.handlePageChange);
        PageStore.fetchPage(this.props.params.pageId);

        BlockStore.addChangeListener(this.handleBlockChange);
        BlockStore.fetchBlock(this.props.params.id);
    },

    render: function () {
        if (null === this.state.website || null === this.state.page || null === this.state.block) {
            return (<div></div>);
        }

        return (
            <div>
                <div className="page-container">
                    <h1 className="page-title">Block: {this.state.block.name}</h1>
                </div>

                <div className="breadcrumbs">
                    <Link to="home">websites</Link>
                    <i className="fa fa-angle-right" /> <Link to="website" params={{id: this.state.website.id}}>{this.state.website.name}</Link>
                    <i className="fa fa-angle-right" /> <Link to="page" params={{websiteId: this.state.website.id, id: this.state.page.id}}>page: {this.state.page.name}</Link>
                    <i className="fa fa-angle-right" /> <span>block: {this.state.block.name}</span>
                </div>

                <h3>Settings</h3>
            </div>
        );
    }
});