var React = require('react/addons');
var Link  = require('react-router').Link;

var PageListRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td className="cell__id">#{this.props.page.id}</td>
                <td>
                    <Link to="page" params={{ id: this.props.page.id }}>
                        {this.props.page.name}
                    </Link>
                </td>
                <td>{this.props.page.url}</td>
                <td>
                    <span className="button button--m button--danger">
                        <i className="fa fa-trash-o" />
                        delete
                    </span>
                </td>
            </tr>
        );
    }
});

module.exports = PageListRow;
