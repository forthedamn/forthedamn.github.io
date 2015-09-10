var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');
var Paper = mui.Paper,
List = mui.List,
ListItem = mui.ListItem,
Avatar = mui.Avatar,
Link = Router.Link;

var MyLinkButton = require('./MyLinkButton');
// 文章题目，摘要等信息
var pagePackage = require('../page/pagePackage');

/**
 * 这是目录控件
 */
var MyDirectory = React.createClass({
    clickHandler: function() {
        window.location.hash = '/pages/20150829';
    },
    render: function () {
        var _this = this;
        var listItemProps = {
            onClick: _this.clickHandler,
            onTouchStart: _this.clickHandler,
            leftAvatar: <Avatar src="src/images/head.jpg"/>
        };
        return (
            <Paper zDepth={1} style={{margin:'166px auto',width:'70%',padding:'20px'}}>
                <Paper zDepth={1} style={{width: '88px',marginBottom: '10px'}}>
                    <MyLinkButton location='/' label='< 返回' />
                </Paper>
                <List>
                    <ListItem primaryText="Promise小练习" {...listItemProps} /> 
                </List>
            </Paper>
            );
    }
})

module.exports = MyDirectory;