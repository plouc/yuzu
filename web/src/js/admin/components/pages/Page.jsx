var React        = require('react/addons');
var $            = require('jquery');
var Link         = require('react-router').Link;
var Reflux       = require('reflux');

var PageActions  = require('./../../../core/actions/PageActions');
var BlockActions = require('./../../../core/actions/BlockActions');

var PageStore    = require('./../../../core/stores/PageStore');
var BlocksStore  = require('./../../../core/stores/BlocksStore');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function () {
        return {
            page:    null,
            blocks:  []
        };
    },

    componentWillMount: function () {
        this.listenTo(PageStore,   this._onPageChange);
        this.listenTo(BlocksStore, this._onBlocksChange);

        PageActions.get(this.props.params.id);
        BlockActions.byPage(this.props.params.id);
    },

    render: function () {
        if (null === this.state.page || null === this.state.website) {
            return (<div></div>);
        }

        var blockNodes = this.state.blocks.map(function (block) {
            //<Link to="page_block" params={{pageId: this.state.page.id, id: block.id}}>#{block.id}</Link>

            return (
                <tr>
                    <td>
                    </td>
                    <td>{block.name}</td>
                    <td>{block.type}</td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <div className="page-container">
                    <h1 className="page-title">Page: {this.state.page.name}</h1>
                </div>

                <div className="breadcrumbs">
                    <div className="breadcrumbs__wrapper">
                        <Link to="pages">pages</Link>
                        <i className="fa fa-angle-right" /> <span>page: {this.state.page.name}</span>
                    </div>
                </div>

                <div className="page-container">
                    <div className="page-container__wrapper">
                        <h3>Blocks</h3>
                        <table className="table">
                            <tbody>
                                {blockNodes}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    },


    _onPageChange: function (page) {
        this.setState({
            page: page
        });
    },

    _onBlocksChange: function (blocks) {
        this.setState({
            blocks: blocks
        });
    }
});