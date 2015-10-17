var React = require("react");
var $ = require("jquery");
var mui = require("material-ui");
var ThemeManager = new mui.Styles.ThemeManager();
var Paper = mui.Paper;

var MyLinkButton = require("./MyLinkButton.jsx");
var MyLoading = require("./MyLoading");

/**
 * 阅读全文控件
 */
var MyArticle = React.createClass({
    getInitialState: function () {
        return {
            display: 'loading',
            cardWidth: '70%'
        }
    },
    componentWillMount() {
        if (window.innerWidth < 600) {
          this.setState({
            cardWidth: '100%'
          })
        }
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
    contentOnloadHandler: function () {
        this.setState({
            display: 'loaded'
        });
    },
    render: function () {
        var htmlName = this.props.params.htmlName;
        var pageSrc = '../page/' + htmlName + '.html';
        var contentOnloadHandler = this.contentOnloadHandler;
        var paperStyle = {
            margin:'166px auto',
            width:this.state.cardWidth,
            padding:'20px'
        }
        return (
            <Paper zDepth={1} style={paperStyle}>
                <MyLinkButton type='back' label='< 返回' />
                <MyLoading
                    display={this.state.display}
                />
                <MyArticleContent 
                    contentOnloadHandler={contentOnloadHandler} 
                    pageSrc={pageSrc}
                    display={this.state.display}
                    />
            </Paper>
        )
    }
});

/**
 * 文章正文
 */
var MyArticleContent = React.createClass({
    /**
     * 对文本做适配处理
     */
    contentAdapt() {

    },
    componentWillMount() {
        var _this = this;
        // 加载文章
        $.ajax(this.props.pageSrc).then(function(data,status,XHR){
            var start = data.indexOf('<body>') + 6;
            var end = data.indexOf('</body>');
            var content = data.slice(start, end);
            $('#article-content').html(content);
            _this.contentAdapt();
            // 让组件的state变为loaded
            _this.props.contentOnloadHandler();
        }) 
    },
    render: function () {
        // 处于loading阶段是隐藏
        var display = this.props.display === 'loading' ? 
        {display:'none'} : {display: 'block'};
        return (
            <div  id='article-content' style={display}>
            </div>
            )
    }
});

module.exports = MyArticle;