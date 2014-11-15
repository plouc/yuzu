var React = require('react/addons');

var App = React.createClass({
    render: function () {
        return (
            <h1>TESTING FRONTEND</h1>
        );
    }
});

React.render((
    <App />
), document.body);