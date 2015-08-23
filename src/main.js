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
var MyAppBar = require('./MyAppBar.jsx');

injectTapEventPlugin();

var MyPage = React.createClass({
    /**
     * material－ui 必须有的方法
     * @type {Object}
     */
    childContextTypes: {
       muiTheme: React.PropTypes.object
    },
    /**
     * material－ui 必须有的方法
     * @type {Object}
     */
    getChildContext: function () {
       return {
         muiTheme: ThemeManager.getCurrentTheme()
       };
    },
    componentDidMount: function () {

    },
    /**
     * app bar lefticon click hanlder
     */
    onLeftIconButtonClickHandler: function() {
      this.refs.leftNav.open();
    },
    /**
     * leftNav点击事件回调函数
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
        { route: 'Get Started', text: '是写东西呢' },
        { route: 'Customization', text: '还是继续做东西' },
        { route: 'Components', text: '。。' }
      ];
      /**
       * <leftNav>
       * menuItems 其实是一个<Menu/> 组件，这里面的内容事件通过 onChange 监听到
       */
       return (
        <div onClick={this.clickHandler}>
            <MyAppBar ref='appBarTitle' onLeftIconButtonClickHandler={this.onLeftIconButtonClickHandler}/>
            <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this.leftNavOnChangeHandler}/>
            <MyCardCollection />
        </div>
       );
    }
});
React.render(<MyPage />,document.getElementById('main'));
