var React       = require('react/addons');
var Link        = require('react-router').Link;
var Reflux      = require('reflux');

var PageActions = require('./../../../core/actions/PageActions');
var PagesStore  = require('./../../../core/stores/PagesStore');
var PageList    = require('./../PageList.jsx');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            pages: []
        };
    },

    componentDidMount: function () {
        this.listenTo(PagesStore, this._onPagesChange);

        PageActions.all();
    },

    render: function () {
        return (
            <div>
                <div className="page-container">
                    <h1 className="page-title">Pages</h1>
                </div>

                <div className="breadcrumbs">
                    <div className="breadcrumbs__wrapper">
                        <span>pages</span>
                    </div>
                </div>

                <div className="page-container">
                    <div className="page-container__wrapper">
                        <PageList pages={this.state.pages} />
                    </div>
                </div>
            </div>
        );
    },


    _onPagesChange: function (pages) {
        this.setState({
            pages: pages
        });
    }
});