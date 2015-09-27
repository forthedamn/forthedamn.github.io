var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');
var injectTapEventPlugin = require("react-tap-event-plugin"),
LeftNav = mui.LeftNav,
ThemeManager = new mui.Styles.ThemeManager();
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// 页面集合控件
var MyCardCollection = require('./MyCardCollection');
var MyAppBar = require('./MyAppBar');
var MyArticle = require('./MyArticle');
// 目录控件
var MyDirectory = require('./MyDirectory');

injectTapEventPlugin();

/**
 * material-ui 必须要的属性
 * @type {Object}
 */
var childrenContext = {
    childContextTypes: {
       muiTheme: React.PropTypes.object
    },
    getChildContext: function () {
       return {
         muiTheme: ThemeManager.getCurrentTheme()
       };
    }
};

/**
 * 页面主体控件
 */
var MyPageMain = React.createClass({
    mixins: [childrenContext],
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
      window.location.hash = payload.route;
    },
    render: function () {
        // 用于leftNav 填充选项
        var menuItems = [
          { route: '', text: '首页'},
          { route: 'directory', text: '目录' }
           ];
        /**
         * <leftNav>
         * menuItems 其实是一个<Menu/> 组件，这里面的内容事件通过 onChange 监听到
         */
        return (
            <div>
                {/*页面head控件*/}
                <MyAppBar ref='appBarTitle' onLeftIconButtonClickHandler={this.onLeftIconButtonClickHandler}/>
                {/*页面左侧导航*/}
                <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this.leftNavOnChangeHandler}/>
                <RouteHandler/>
            </div>
            )
    }
});

/**
 * 路由
 * @type {jsx}
 */
var routes = (
  <Route name="main" path="/" handler={MyPageMain}>
    <DefaultRoute handler={MyCardCollection}/>
    {/*htmlName 将会传入handler控件的props.params中*/}
    <Route name="pages" path="/pages/:htmlName?" handler={MyArticle}/>
    {/*路由控件*/}
    <Route name="directory" path="/directory" handler={MyDirectory}/>
  </Route>
);

Router.run(routes,Router.HashLocation,function (Handler) {
  React.render(<Handler/>, document.body);
});
