var React = require('react');
var MyCard = require('./MyCard.jsx');
var $ = require("jquery");
var mui = require('material-ui'),
FlatButton = mui.FlatButton,
ThemeManager = new mui.Styles.ThemeManager();

// loading 状态控件
var MyLoading = require("./MyLoading");
// 存放页面信息
var pages=[];

var MyCardCollection = React.createClass({
    getInitialState: function () {
      var _this = this;
      // 显示更多页面按键是否可点击
      var disabled;
      $.ajax("../page/pagePackage.json").then(function(data,status,XHR){
        pages = data;
        var length = pages.length;
        if (length <= _this.state.end) {
          disabled = 'disabled';
        }
        _this.setState({
          disabled: disabled,
          pages: pages,
          load: 'loaded'
        })
      });
      return {
        // 初始显示页数
        end: 3,
        // 显示更多页面按键是否可点击
        disabled: disabled || 'disabled',
        // 存放页面信息
        pages:[],
        // 供loading控件所使用的状态
        load: 'loading'
      }
    },
    /**
     * 页面显示状态处理方法
     */
    pageStateHandler: function (page) {
      var end = page;
      var length = pages.length;
      var disabled;
      if (end >= length-1) {
        disabled = 'disabled';
      }
      this.setState({
        end: page, // 当前显示页数
        disabled: disabled// 是否‘显示更多’
      })
    },
    componentWillMount() {
      var page = this.props.page;
      this.pageStateHandler(page);
    },
    render: function() {
      var _this = this;
      var end = this.state.end;
      // 页面将要显示的page数组
      var pageDisplay = this.state.pages.slice(0, end);
      // v 页面控件props
      var pageDoms = pageDisplay.map(function(v,k) {
        var props = v;
        if (v) {
          return (
              <MyCard {...props} readMoreClickHandler={_this.readMoreClickHandler}/>
            )
        };
      });
       return (
          <div style={{marginTop: '170px'}}>
            <MyLoading display={this.state.load} />
            <div>
              {pageDoms}
            </div>
            <FlatButton style={{margin: '0 auto 30px auto',display: 'block'}}label='显示更多' 
              disabled={this.state.disabled} onClick={this.props.loadMoreArticle}>
              <i className="fa fa-spinner fa-pulse" style={{marginRight: '13px'}}></i>
            </FlatButton>
          </div>
       );
    }
});
module.exports = MyCardCollection;