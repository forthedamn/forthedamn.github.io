var React = require('react');
var mui = require('material-ui');
var $ = require('jquery');
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

// 全局命名空间
var global = {
  // 初始化显示页面数量
  page: 3
};

// touch to click 插件
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
    /**
     * '返回顶部'点击回调事件
     */
    getTopHandler: function() {
      if($(window).scrollTop() >100){
        $('body,html').animate({ scrollTop: 0 }, 800);
      }else {
        $(window).scrollTop(0);
      }
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
                <div 
                  id='getTop'
                  onClick={this.getTopHandler}
                  title='返回顶部'
                  style={{position:'fixed',right:'10%',bottom:'80px',color:'#777',
                fontSize:'45px',backgroundColor:'#E2DADA',height:'50px',width:'50px',
                cursor:'pointer',zIndex:'9999',display:'none',opacity:'0.7'}}>
                  <i style={{position:'relative',top:'-9px',left:'2px'}} className="fa fa-chevron-up"></i>
                </div>
                {/*ReactRouter 将路由管理的所有组件都放在了这个标签中*/}
                <RouteHandler/>
            </div>
            )
    }
});

/**
 * 重新封装MyCardCollection组件
 * 保存当前已显示的卡片
 */
var CardCollection = React.createClass({

  getInitialState() {
      return {
        page: global.page
      };
  },

  loadMoreArticleHandler() {
    global.page += 3;
    this.setState({
      page: global.page
    })
    this.refs.collection.pageStateHandler(global.page); 
  },

  render: function() {
    return (
        <div>
          <MyCardCollection ref='collection' page={this.state.page} loadMoreArticle={this.loadMoreArticleHandler}/>
        </div>
      )
  }
})


/**
 * 路由 管理组件
 * @type {jsx}
 */
var routes = (
  <Route name="main" path="/" handler={MyPageMain}>
    <DefaultRoute handler={CardCollection}/>
    {/*htmlName 将会传入handler控件的props.params中*/}
    <Route name="pages" path="/pages/:htmlName?" handler={MyArticle}/>
    {/*路由控件*/}
    <Route name="directory" path="/directory" handler={MyDirectory}/>
  </Route>
);

Router.run(routes,Router.HashLocation,function (Handler) {
  React.render(<Handler/>, document.body);
});
