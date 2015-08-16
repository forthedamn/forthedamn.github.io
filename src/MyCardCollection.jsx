var React = require('react');
var MyCard = require('./MyCard.jsx');
var mui = require('material-ui'),
ThemeManager = new mui.Styles.ThemeManager();


var MyCardCollection = React.createClass({
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
          <div>
            <MyCard src='test'/>
            <MyCard src='test'/>
            <MyCard src='test'/>
          </div>
       );
    }
});
module.exports = MyCardCollection;