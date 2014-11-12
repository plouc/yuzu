var React = require('react/addons');
var Link  = require('react-router').Link;

var PageTreeLeaf = React.createClass({
    getInitialState: function () {
        return {
            expanded: true
        };
    },

    render: function () {
        var leavesNodes = this.props.page.pages.map(function (page) {
            return <PageTreeLeaf key={page.id} page={page} onCreateClick={this.props.onCreateClick} />
        }.bind(this));

        var leaves = null;
        var toggle = null;

        if (leavesNodes.length > 0) {
            var leavesClass = 'pages-tree__items' + (this.state.expanded ? '' : ' _is-hidden');
            leaves = <ul className={leavesClass}>
                {leavesNodes}
            </ul>

            var toggleClass = 'fa fa-chevron-' + (this.state.expanded ? 'down' : 'right');
            toggle = <span onClick={this._onToggleClick} className="pages-tree__item__toggle">
                <i className={toggleClass} />
            </span>
        }

        return (
            <li>
                <div className="pages-tree__item">
                    <span className="pages-tree__item__id">{this.props.page.id}</span>
                    {toggle}
                    <Link className="pages-tree__item__label" to="page" params={{id: this.props.page.id}}>
                        {this.props.page.name} <small>{this.props.page.url}</small>
                    </Link>
                    <span onClick={this._onCreateClick} className="button button--m">
                        <i className="fa fa-plus" /> add
                    </span>
                </div>
                {leaves}
            </li>
        );
    },

    _onToggleClick: function () {
        console.log('_onToggleClick');
        this.setState({
            expanded: !this.state.expanded
        });
    },

    _onCreateClick: function () {
        this.props.onCreateClick(this.props.page);
    }
});


module.exports = PageTreeLeaf;