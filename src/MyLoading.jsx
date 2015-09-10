var React = require("react");
var $ = require("jquery");
var mui = require("material-ui");
var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper,
CircularProgress = mui.CircularProgress;

var MyLoding = React.createClass({
    render: function() {
        var style = {
            width: '200px',
            margin: '0 auto'
        }
        style.display = this.props.display !== 'loading' ? 'none' : 'block';
        return (
            <div style={style}>
                <CircularProgress mode="indeterminate" size={2} />
            </div>
            )
    }
});

module.exports = MyLoding;