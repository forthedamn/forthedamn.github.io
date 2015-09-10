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
        if (length <=3) {
          disabled = 'disabled';
        }
        _this.setState({
          disabled: disabled,
          pages: pages,
          load: 'loaded'
        })
      });
      return {
        // 每次显示3页
        end: 3,
        // 显示更多页面按键是否可点击
        disabled: disabled || 'disabled',
        // 存放页面信息
        pages:[],
        load: 'loading'
      }
    },
    /**
     * 显示更多／翻页
     */
    nextPage: function () {
      var length = pages.length;
      var end = this.state.end;
      var disabled;
      if (end >= length-1) {
        disabled = 'disabled';
      }
      this.setState({
        end: end+3, // page数组显示的末端
        disabled: disabled// 是否‘显示更多’
      })
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
          <div style={{marginTop: '150px'}}>
            <MyLoading display={this.state.load} />
            <div>
              {pageDoms}
              <FlatButton style={{margin: '0 auto 30px auto',display: 'block'}}label='显示更多' 
                disabled={this.state.disabled} onClick={this.nextPage}/>
            </div>
          </div>
       );
    }
});
module.exports = MyCardCollection;