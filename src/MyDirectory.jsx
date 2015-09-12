var React = require('react');
var mui = require('material-ui');
var Router = require('react-router');
var $ = require('jquery');
var Paper = mui.Paper,
List = mui.List,
ListItem = mui.ListItem,
Avatar = mui.Avatar,
Link = Router.Link;

var MyLinkButton = require('./MyLinkButton');
var MyLoading = require('./MyLoading');

/**
 * 目录控件
 */
var MyDirectory = React.createClass({
    /**
     * @param  {string} htmlName 页面文件
     */
    clickHandler: function(htmlName) {
        window.location.hash = '/pages/'+htmlName;
    },
    getInitialState: function () {
        return {
            load: 'loading',
            pageAbstract: ''
        };
    },
    componentWillMount: function () {
        var _this = this;
        $.ajax("../page/pagePackage.json").then(function(data,status,XHR){
            _this.setState({
                load: 'loaded',
                pageAbstract: data
            })
        })  
    },
    render: function () {
        var _this = this;
        var listItemProps = {
            onTouchStart: _this.clickHandler,
            leftAvatar: <Avatar src="src/images/head.jpg"/>
        };
        var pageAbstract = this.state.pageAbstract;

        var listItems = <MyLoading display={this.state.load}/>;
        if (pageAbstract) {
            listItems = pageAbstract.map(function(data){
                // 构造闭包，保存htmlName
                var htmlName = data.htmlName;
                var itemClickHanler = function () {
                    _this.clickHandler.call(this,htmlName);
                }
                return  function(){
                    return (<ListItem 
                                primaryText={data.cardTitle}
                                onClick={itemClickHanler}
                                {...listItemProps}
                            />);
                }()
             });
        }
        return (
            <Paper zDepth={1} style={{margin:'166px auto',width:'70%',padding:'20px'}}>
                <Paper zDepth={1} style={{width: '88px',marginBottom: '10px'}}>
                    <MyLinkButton type='back' label='< 返回' />
                </Paper>
                <List>
                    {listItems}
                </List>
            </Paper>
            );
    }
})

module.exports = MyDirectory;