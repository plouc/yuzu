var React        = require('react/addons');
var Reflux       = require('reflux');

var PageStore    = require('./../../core/stores/PageStore');
var BlocksStore  = require('./../../core/stores/BlocksStore');

var PageActions  = require('./../../core/actions/PageActions');
var BlockActions = require('./../../core/actions/BlockActions');

var Page = React.createClass({
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

        PageActions.get(this.props.pageId);
    },

    componentWillReceiveProps: function (nextProps) {
        PageActions.get(nextProps.pageId);
    },

    render: function () {

        var title = '';
        if (this.state.page) {
            title = this.state.page.name;
        }

        var blocks = this.state.blocks.map(function (block, i) {
            return (
                <h2 key={block.type + i}>{block.name} [{block.type}:{block.id}]</h2>
            );
        });

        return (
            <div>
                <h1>{title}</h1>
                {blocks}
            </div>
        );
    },



    _onPageChange: function (page) {
        BlockActions.byPage(page.id);
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

module.exports = Page;