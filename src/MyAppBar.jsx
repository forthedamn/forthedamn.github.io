var React = require('react');
var $ = require('jquery');
var MyCard = require('./MyCard.jsx');
var mui = require('material-ui'),
injectTapEventPlugin = require("react-tap-event-plugin"),
FlatButton = mui.FlatButton,
AppBar = mui.AppBar,
Avatar = mui.Avatar,
ThemeManager = new mui.Styles.ThemeManager();

injectTapEventPlugin();

var MyAppBar = React.createClass({
    getInitialState: function () {

        return {
            // appbar 高度
            height: '150px',
            // appbar 中的paddingtop
            paddingTop: '20px',
            // head 长宽
            headSize: '90px',
            // head postion
            headX: '-6px ', // 最后有个空格，为了合法的格式
            headY: '34%'
            // -23 -3
        }
    },
    componentDidMount: function () {
        var _this = this;
        //debugger;
        // 绑定滚动，实现页面顶部appbar自适应变化
        $(window).scroll(function(e){
            var scrollHeight = $(this).scrollTop();
            // 返回顶部
            var getTop = document.getElementById('getTop');
            getTop.style.display = 'block';
            if (scrollHeight < 10) getTop.style.display = 'none';;
            // 变换缓慢因子，该因子越大，变换越缓慢
            var changeSlowFactor = 300;
            // 获得滚动高度比例,下滑逐渐趋于1
            var radio = Math.min(scrollHeight/changeSlowFactor, 1);
            if (scrollHeight <= changeSlowFactor) {
                var height = 50 + 100 *(1-radio);
                var paddingTop = 20*(1-radio);
                var headSize = 50 + 40*(1-radio);
                var headX = -20 + (14*(1-radio));
                var headY = -3 + 37*(1-radio);
            }else {
                height = 50;
                paddingTop = 0;
                headSize = 50;
                headX = -20;
                headY = -3; 
            }
            _this.setState({
                height: height + 'px',
                paddingTop: paddingTop + 'px',
                headSize: headSize + 'px',
                headX: headX + 'px ', //最后有个空格
                headY: headY + '%'
            });
        });
        // 实现页面加载成功后，背景的渐进变化
        setTimeout(function () {
            React.findDOMNode(_this.refs.appbarTitleBg).style.transform = 'scale(1,1)';
        }, 0);
    },
    onLeftIconButtonClickHandler: function () {
        this.props.onLeftIconButtonClickHandler();
    },
    render: function () {
        var height = this.state.height;
        var paddingTop = this.state.paddingTop;
        var headSize = this.state.headSize;
        var headX = this.state.headX;
        var headY = this.state.headY;
        var onLeftIconButtonClickHandler = this.onLeftIconButtonClickHandler;
        return (
            <div style={{zIndex: '2', position: 'fixed',top: 0,height: height ,width: '100%',overflow: 'hidden'}}>
                <AppBar ref='appbarTitle'
                  title={
                    <Avatar style={{width: headSize, height: headSize, backgroundImage: 'url(src/images/head.jpg)',
                        backgroundPosition: headX + headY, backgroundSize: '110px 110px'}}></Avatar>}
                    style={{boxShadow: 'none', paddingTop: paddingTop,backgroundColor: 'none', height: height, position: 'relative'}}
                    onLeftIconButtonTouchTap={onLeftIconButtonClickHandler} />
                <div ref='appbarTitleBg' style={{position: 'absolute', top:'0px', height: height, 
                    width: '100%',backgroundImage:'url(src/images/titlebg.jpg)',backgroundPosition:'0 86%',
                    transform: 'scale(1.2,1.2)', transition:'transform 8s'}}></div>
            </div>
            );
    }
});

module.exports = MyAppBar;