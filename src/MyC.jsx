var React = require('react');
var mui = require('material-ui'),
ThemeManager = new mui.Styles.ThemeManager(),
RaisedButton = mui.RaisedButton;

var MyCard = React.createClass({
    childContextTypes: {
       muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
       return {
         muiTheme: ThemeManager.getCurrentTheme()
       };
    },

    render: function() {
       return (
           <RaisedButton label="Default" />
       );
    }
});
module.exports = MyCard;