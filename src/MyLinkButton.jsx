var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var mui = require('material-ui');
var injectTapEventPlugin = require("react-tap-event-plugin");
var FlatButton = mui.FlatButton,
Link = Router.Link,
ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

var MyLinkButton = React.createClass({
    render: function () {
        // 按键文字
        var label = this.props.label;
        // 跳转地址
        var location = this.props.location;
        // 传递参数
        var params = this.props.params;
        return (
            <div>
                <Link to={location} params={params}>
                    <FlatButton label={label}/>
                </Link>
            </div>
        );
    }
});

module.exports = MyLinkButton;
