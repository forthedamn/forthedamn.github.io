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
// 加载菊花
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
            // 文章题目
            pageAbstract: '',
            cardWidth: '70%'
        };
    },
    componentWillMount: function () {
        var _this = this;
        $.ajax("../page/pagePackage.json").then(function(data,status,XHR){
            // 加载类型
            var type = _this.props.params.type.toLowerCase();
            // 缓存结果
            var result = [];
            // 加载指定类型
            if (type !== 'all') {
                data.forEach(function(v,i){
			//缓存tagType
                    var typeArray = v.tagType.map(function(value,i) {
                        return value.toLowerCase();
                    })
                    if(typeArray.indexOf(type) !== -1) result.push(v)
                })
            }else {
                result = data;
            }
            _this.setState({
                load: 'loaded',
                pageAbstract: result
            })
        });
        // 自适应操作
        if (window.innerWidth < 600) {
          this.setState({
            cardWidth: '100%'
          })
        };
        window.addEventListener('resize', function(event){
          if (window.innerWidth < 600) {
            this.setState({
              cardWidth: '100%'
            })
          }else {
            this.setState({
              cardWidth: '70%'
            })
          }
        }.bind(this),false);
    },
    render: function () {
        var _this = this;
        // 头像图片
        var listItemProps = {
            leftAvatar: <Avatar src="src/images/head.jpg"/>
        };
        // 获得pagePackage中的内容摘要
        var pageAbstract = this.state.pageAbstract;
        var listItems = <MyLoading display={this.state.load}/>;
        if (pageAbstract) {
            listItems = pageAbstract.map(function(data){
                // 构造闭包，保存htmlName
                var htmlName = data.htmlName;
                // 点击回调函数
                var itemClickHanler = function () {
                    _this.clickHandler.call(this,htmlName);
                }
                // 日期格式化，暂时用html文件名作为日期
                var formatDate = (function(htmlName) {
                    var year = htmlName.slice(0,4);
                    var month = htmlName.slice(4,6);
                    var day = htmlName.slice(6);
                    return year+'-'+month+'-'+day;
                })(htmlName);
                return  function(){
                    return (<ListItem 
                                primaryText={data.cardTitle}
                                secondaryText={formatDate}
                                onClick={itemClickHanler}
                                {...listItemProps}
                            />);
                }()
             });
        }
        var parperStyle = {
            margin: '166px auto',
            width: this.state.cardWidth,
            padding: '20px'
        }
        return (
            <Paper zDepth={1} style={parperStyle}>
                <MyLinkButton type='back' label='< 返回' />
                <List>
                    {listItems}
                </List>
            </Paper>
            );
    }
})

module.exports = MyDirectory;
