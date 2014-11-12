var React                   = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Router                  = require('react-router');
var WebsiteStore            = require('./../../stores/WebsiteStore');
var $                       = require('jquery');

var WebsiteForm = React.createClass({
    getFormData: function () {
        var data = {
            name:     this.refs.name.getDOMNode().value,
            hostname: this.refs.hostname.getDOMNode().value
        };

        return data;
    },

    applyFloatingLabels: function () {
        var $form   = $(this.getDOMNode());
        var $groups = $form.find('.form__micro-group');

        $groups.each(function (i, group) {
            var $input = $(group).find('input');

            $input.on('change', function (e) {
                if ($input.val() !== '') {
                    $(group).addClass('_is-filled');
                } else {
                    $(group).removeClass('_is-filled');
                }
            });
        });
    },

    componentDidMount: function () {
        this.applyFloatingLabels();
    },

    componentDidUpdate: function () {
        this.applyFloatingLabels();
    },

    render: function () {
        var form = <div className="page-container form--website">
            <div className="page-container__wrapper">
                <h3>Create a new website</h3>
                <div className="form__micro-group form__micro-group--full reverse">
                    <input className="form__micro-group__control" type="text" id="name" ref="name" />
                    <label className="form__micro-group__label" htmlFor="name">Name</label>
                </div>
                <div className="form__micro-group form__micro-group--full reverse">
                    <input className="form__micro-group__control" type="text" id="hostname" ref="hostname" />
                    <label className="form__micro-group__label" htmlFor="hostname">Hostname</label>
                </div>

                <div className="form__actions">
                    <button type="button" className="button button--ok reverse" onClick={this._onSubmit}>
                        <i className="fa fa-save" />
                        save
                    </button>
                    <span className="button button--warn reverse" onClick={this.props.onCancel}>
                        <i className="fa fa-undo" />
                        cancel
                    </span>
                </div>
            </div>
        </div>

        return (
            <ReactCSSTransitionGroup transitionName="website-form">
                {this.props.expanded === true ? form : null}
            </ReactCSSTransitionGroup>
        );
    },


    _onSubmit: function () {
        this.props.onSubmit(this.getFormData());
    }
});

module.exports = WebsiteForm;