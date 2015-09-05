var React = require('react');
var MyCard = require('./MyCard.jsx');
var mui = require('material-ui'),
pagePackage = require('../page/pagePackage.js'),
FlatButton = mui.FlatButton,
ThemeManager = new mui.Styles.ThemeManager();

/**
 * 所有的页面名字
 * @type {array}
 */
var pages = pagePackage();

var MyCardCollection = React.createClass({
    getInitialState: function () {
      var length = pages.length;
      var disabled;
      if (length <=3) {
        disabled = 'disabled';
      }
      return {
        end: 3,
        disabled: disabled,
        // 该collection控件显示状态
        // true: 多page，collection状态
        // false: 单页面状态
        collectionState: true 
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
    /**
     * 阅读全文点击回调
     * @param  {string} pagescr page页面html资源名称
     */
    readMoreClickHandler: function (pagescr) {
      this.setState({
        collectionState: false,
        pageSrc: pagescr
      });
    },
    render: function() {
      var _this = this;
      var end = this.state.end;
      // 页面将要显示的page数组
      var pageDisplay = pages.slice(0, end);
      var pageDoms = pageDisplay.map(function(v,k) {
        if (v) {
          return (
              <MyCard src={k} name={v} readMoreClickHandler={_this.readMoreClickHandler}/>
            )
        };
      });
      // collection(多页面) single(单页面) 显示方式
      var collectionDisplay = this.state.collectionState ? 'block' : 'none';
      var singleDisplay = !this.state.collectionState ? 'block' : 'none';
      var pageSrc = "../page/" + this.state.pageSrc + ".html";
       return (
          <div style={{marginTop: '150px'}}>
            <div style={{display: collectionDisplay}}>
              {pageDoms}
              <FlatButton style={{margin: '0 auto 30px auto',display: 'block'}}label='显示更多' 
                disabled={this.state.disabled} onClick={this.nextPage}/>
            </div>
          </div>
       );
    }
});
module.exports = MyCardCollection;