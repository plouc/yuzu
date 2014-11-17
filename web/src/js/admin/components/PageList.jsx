var React       = require('react/addons');
var Link        = require('react-router').Link;
var PageListRow = require('./PageListRow.jsx');

var PageList = React.createClass({
    render: function () {
        var pageRows = this.props.pages.map(function (page) {
            return <PageListRow key={page.id} page={page} />
        }.bind(this));

        return <table className="table">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>url</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {pageRows}
            </tbody>
        </table>
    }
});

module.exports = PageList;
