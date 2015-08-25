var React = require("react");
var $ = require("jquery");
var mui = require("material-ui");
var ThemeManager = new mui.Styles.ThemeManager();
var Card = mui.Card,
CardHeader = mui.CardHeader,
CardMedia = mui.CardMedia,
CardTitle = mui.CardTitle,
CardActions = mui.CardActions,
CardText = mui.CardText,
Avatar = mui.Avatar,
Paper = mui.Paper;

var MyLinkButton = require("./MyLinkButton.jsx");

var MyArticle = React.createClass({
    // 在iframe加载时自适应高度
    iframeOnloadHandler: function () {
        var height = articleiFrame.document.body.scrollHeight;
        $('#articleiFrame').css('height', height+'px');
    },
    render: function () {
        var htmlName = this.props.params.htmlName;
        var pageSrc = '../page/' + htmlName + '.html';
        var iframeOnloadHandler = this.iframeOnloadHandler;
        return (
            <Paper zDepth={1} style={{margin:'166px auto',width:'70%',padding:'20px'}}>
                <Paper zDepth={1} style={{width: '88px'}}>
                    <MyLinkButton location='/' label='< 返回' />
                </Paper>
                <iframe id="articleiFrame" name="articleiFrame" onLoad={iframeOnloadHandler}
                    style={{marginTop:'10px',width: '100%',border: '0'}} src={pageSrc}>
                </iframe>
            </Paper>
        )
    }
});

module.exports = MyArticle;