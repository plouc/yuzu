var React     = require('react/addons');
var Link      = require('react-router').Link;
var PageStore = require('./../../stores/PageStore');
var PageList  = require('./../PageList.jsx');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            pages: []
        };
    },

    handlePagesChange: function () {
        this.setState({
            pages: PageStore.getPages()
        });
    },

    componentDidMount: function () {
        PageStore.addChangeListener(this.handlePagesChange);
        PageStore.fetchPages();
    },

    componentWillUnmount: function () {
        PageStore.removeChangeListener(this.handlePagesChange);
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
    }
});