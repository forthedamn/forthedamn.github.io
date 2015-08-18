var React = require('react');
var mui = require('material-ui');
var injectTapEventPlugin = require("react-tap-event-plugin"),
ThemeManager = new mui.Styles.ThemeManager(),
AppBar = mui.AppBar,
FontIcon = mui.FontIcon,
IconButton = mui.IconButton;
var Card = mui.Card,
CardHeader = mui.CardHeader,
CardMedia = mui.CardMedia,
CardTitle = mui.CardTitle,
CardActions = mui.CardActions,
CardText = mui.CardText,
FlatButton = mui.FlatButton,
Avatar = mui.Avatar,
LeftNav = mui.LeftNav;
var MyCardCollection = require('./MyCardCollection.jsx');

injectTapEventPlugin();

var MyPage = React.createClass({
    childContextTypes: {
       muiTheme: React.PropTypes.object
    },
    getChildContext: function() {
       return {
         muiTheme: ThemeManager.getCurrentTheme()
       };
    },
    /**
     * app bar lefticon click hanlder
     */
    onLeftIconButtonClickHandler: function() {
      this.refs.leftNav.open();
    },
    /**
     * leftNavOnChangeHandler
     * @param  {object} e       uiEvent
     * @param  {number} key    the key of items
     * @param  {object} payload 传入的对象
     */
    leftNavOnChangeHandler: function(e, key, payload) {
      debugger;
    },
    render: function() {
      // 用于leftNav 填充选项
      var menuItems = [
        { route: 'get-started', text: 'Get Started' },
        { route: 'customization', text: 'Customization' },
        { route: 'components', text: 'Components' }
      ];
      /**
       * <leftNav>
       * menuItems 其实是一个<Menu/> 组件，这里面的内容事件通过 onChange 监听到
       */
       return (
        <div onClick={this.clickHandler}>
            <AppBar
              title={<Avatar>Xin</Avatar>}
              style={{position: "fixed",top: 0,height: '200px','background-image':'url(http://lorempixel.com/600/337/nature/) no-repeat'}}
              onLeftIconButtonTouchTap = {this.onLeftIconButtonClickHandler} />
            <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this.leftNavOnChangeHandler}/>
            <MyCardCollection />
        </div>
       );
    }
});
React.render(<MyPage />,document.getElementById('main'));
