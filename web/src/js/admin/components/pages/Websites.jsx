var React          = require('react/addons');
var Reflux         = require('reflux');
var $              = require('jquery');
var Link           = require('react-router').Link;

var WebsiteActions = require('./../../../core/actions/WebsiteActions');
var WebsitesStore  = require('./../../../core/stores/WebsitesStore');
var WebsiteForm    = require('./../forms/WebsiteForm.jsx');

var WebsiteRow = React.createClass({
    render: function () {
        return (
            <tr key={this.props.website.id}>
                <td className="cell__id">
                    <Link to="website" params={{id: this.props.website.id}}>#{this.props.website.id}</Link>
                </td>
                <td>{this.props.website.name}</td>
                <td>{this.props.website.hostname}</td>
                <td>
                    <span className="button button--m button--danger" onClick={this._onClick}><i className="fa fa-trash-o" /> delete</span>
                </td>
            </tr>
        );
    },

    _onClick: function () {
        WebsiteActions.delete(this.props.website.id);
    }
});

var Websites = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            creating: false,
            websites: []
        };
    },

    _onWebsitesChange: function (websites) {
        this.setState({
            websites: websites
        });
    },

    handleCreateClick: function () {
        this.setState({ creating: true });
    },

    handleCancelClick: function () {
        this.setState({ creating: false });
    },

    handleFormCancel: function () {
        this.setState({ creating: false });
    },

    componentDidMount: function () {
        this.listenTo(WebsitesStore, this._onWebsitesChange);

        WebsiteActions.all();
    },

    render: function () {
        var nodes = this.state.websites.map(function (website) {
            return <WebsiteRow website={website} />
        });

        return (
            <div>
                <div className="page-container">
                    <h1 className="page-title">Websites</h1>
                </div>

                <div className="breadcrumbs">
                    <div className="breadcrumbs__wrapper">
                        <span>websites</span>
                    </div>
                </div>

                <div className="page-container">
                    <div className="page-container__wrapper">
                        <div className="page-toolbar">
                            <span className="button button--action" onClick={this.handleCreateClick}>
                                <i className="fa fa-plus" />
                                new website
                            </span>
                        </div>
                    </div>
                </div>

                <WebsiteForm expanded={this.state.creating} onSubmit={this._onFormSubmit} onCancel={this.handleFormCancel} />

                <div className="page-container">
                    <div className="page-container__wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th>hostname</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {nodes}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    },

    _onFormSubmit: function (data) {
        WebsiteActions.create(data);
    }
});

module.exports = Websites;