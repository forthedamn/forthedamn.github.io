var React = require('react');
var MyCard = require('./MyCard.jsx');
var mui = require('material-ui'),
pagePackage = require('../page/pagePackage.js'),
FlatButton = mui.FlatButton,
ThemeManager = new mui.Styles.ThemeManager();

/**
 * 所有的页面
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
        disabled: disabled 
      }
    },
    nextPage: function () {
      var length = pages.length;
      var end = this.state.end;
      var disabled;
      if (end >= length-1) {
        disabled = 'disabled';
      }
      this.setState({
        end: end+3,
        disabled: disabled
      })
    },
    render: function() {
      var end = this.state.end;
      var display = pages.slice(0, end);
      var pageDoms = display.map(function(v) {
        return (
            <MyCard src={v} />
          )
      });
       return (
          <div style={{marginTop: '150px'}}>
            {pageDoms}
            <FlatButton style={{margin: '0 auto 30px auto',display: 'block'}}label='显示更多' disabled={this.state.disabled} onClick={this.nextPage}/>
          </div>
       );
    }
});
module.exports = MyCardCollection;