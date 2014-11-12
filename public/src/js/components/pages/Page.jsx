var React        = require('react/addons');
var $            = require('jquery');
var Link         = require('react-router').Link;
var WebsiteStore = require('./../../stores/WebsiteStore');
var PageStore    = require('./../../stores/PageStore');
var BlockStore   = require('./../../stores/BlockStore');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            page:    null,
            blocks:  []
        };
    },
    handlePageChange: function () {
        this.setState({
            page: PageStore.getCurrentPage()
        });
    },

    handleBlocksChange: function () {
        this.setState({
            page: BlockStore.getBlocks()
        });
    },

    componentWillMount: function () {
        PageStore.addChangeListener(this.handlePageChange);
        PageStore.fetchPage(this.props.params.id);

        BlockStore.addChangeListener(this.handleBlocksChange);
        BlockStore.fetchPageBlocks(this.props.params.id);
    },

    componentWillUnmount: function () {
        WebsiteStore.removeChangeListener(this.handleWebsiteChange);
        PageStore.removeChangeListener(this.handlePageChange);
        BlockStore.removeChangeListener(this.handleBlocksChange);
    },

    render: function () {
        if (null === this.state.page || null === this.state.website) {
            return (<div></div>);
        }

        console.log(this.state.blocks);

        var blockNodes = this.state.blocks.map(function (block) {
            return (
                <tr key={block.id}>
                    <td>
                        <Link to="page_block"
                              params={{pageId: this.state.page.id, id: block.id}}>#{block.id}</Link>
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
    }
});