var React        = require('react/addons');
var Link         = require('react-router').Link;
var PageTreeLeaf = require('./PageTreeLeaf.jsx');
var $            = require('jquery');


var PageTree = React.createClass({
    render: function () {
        var pageNodes = null;
        if (this.props.pages.length > 0) {
            pageNodes = this.props.pages.map(function (page) {
                return <PageTreeLeaf
                    key={page.id}
                    page={page}
                    onCreateClick={this.props.onCreateClick}
                />
            }.bind(this));
        }

        return (
            <div className="pages-tree">
                <ul>{pageNodes}</ul>
            </div>
        );
    }
});

module.exports = PageTree;
