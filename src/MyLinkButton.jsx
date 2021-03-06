var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var mui = require('material-ui');
var injectTapEventPlugin = require("react-tap-event-plugin");
var RaisedButton = mui.RaisedButton,
Link = Router.Link,
ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

var MyLinkButton = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func
    },
    render: function () {
        // 按键文字
        var label = this.props.label;
        // 跳转地址
        var location = this.props.location;
        // 传递参数
        var params = this.props.params;
        // LinkButton的type属性
        switch(this.props.type){
            // 当作为'返回'键时
            case 'back':
                var linkProps = {
                    onClick :function() {
                        window.history.back();
                    }
                }
                return (
                    <RaisedButton {...linkProps} secondary={true}label={label}/>
                    );
			// 作为类型标签
			case 'typeTag':
				var linkProps = {
					to: location,
					params: params
				}
				return (
						<div style={{display:'inline-block'}}>
							<Link {...linkProps}>
								{label}
							</Link>
						</div>
					   );
            // 当作为普通linkbutton
            default:
                var linkProps = {
                    to: location,
                    params: params
                }
                return (
                    <div style={{display:'inline-block'}}>
                        <Link {...linkProps}>
                            <RaisedButton secondary={true} label={label}/>
                        </Link>
                    </div>
                );
        }
    }
});

module.exports = MyLinkButton;
