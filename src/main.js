var React = require('react');
var mui = require('material-ui'),
ThemeManager = new mui.Styles.ThemeManager(),
AppBar = mui.AppBar,
FontIcon = mui.FontIcon,
IconButton = mui.IconButton;


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
           <AppBar
                title="Xin"
                //iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementRight={<FontIcon className="muidocs-icon-action-home" />}
                />
       );
    }
});
React.render(<MyCard />,document.getElementById('main'));
