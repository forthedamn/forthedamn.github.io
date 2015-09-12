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
            display: 'loading'
        }
    },
    // 在iframe加载时自适应高度
    iframeOnloadHandler: function () {
        var height = articleiFrame.document.body.scrollHeight;
        $('#articleiFrame').css('height', height+'px');
        this.setState({
            display: 'loaded'
        }); 
    },
    render: function () {
        var htmlName = this.props.params.htmlName;
        var pageSrc = '../page/' + htmlName + '.html';
        var iframeOnloadHandler = this.iframeOnloadHandler;
        return (
            <Paper zDepth={1} style={{margin:'166px auto',width:'70%',padding:'20px'}}>
                <Paper zDepth={1} style={{width: '88px'}}>
                    <MyLinkButton type='back' label='< 返回' />
                </Paper>
                <MyLoading
                    display={this.state.display}
                />
                <MyArticleContent 
                    iframeOnloadHandler={iframeOnloadHandler} 
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
    render: function () {
        // 处于loading阶段是隐藏
        var display = this.props.display === 'loading' ? {display:'none'} : {display:'block'};
        return (
            <div style={display}>
                <iframe id="articleiFrame" name="articleiFrame" onLoad={this.props.iframeOnloadHandler}
                    style={{marginTop:'10px',width: '100%',border: '0'}} src={this.props.pageSrc}>
                </iframe>
            </div>
            )
    }
});

module.exports = MyArticle;