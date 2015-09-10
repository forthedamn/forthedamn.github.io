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
Avatar = mui.Avatar;


var MyLinkButton = require("./MyLinkButton.jsx");

var MyCard = React.createClass({
    /**
     * 阅读全文点击事件
     */
    readMoreClickHandler: function () {
      var page = this.props.name;
      window.location = page;
      //this.props.readMoreClickHandler(page);
    },
    render: function() {
      // 判断是否显示media，图片
      var hasMedia = this.props.hasMedia;
      var mediaNode;
      if (hasMedia) {
        var imgSrc = this.props.imgSrc || "http://lorempixel.com/600/337/nature/";
          mediaNode = function () {
              return (<CardMedia overlay={<CardTitle title={this.props.imgTitle} subtitle={this.props.imgSubtitle}/>}>
                <img src={imgSrc}/>
              </CardMedia>);
            }()
          }
      // 文件名
      var htmlName = {htmlName: this.props.htmlName};
       return (
            <Card style={{width:"50%",margin:"70px auto",position:"relative"}}>
              <CardHeader
                 title={this.props.cardTitle}
                 subtitle={this.props.cardSubtitle}
                 avatar={<Avatar>Xin</Avatar>}/>
                 {mediaNode}
              <CardText>
                {this.props.cardAbstract}
              </CardText>
              <CardActions>
                <MyLinkButton label="阅读全文" location="pages" params={htmlName}/>
              </CardActions>
             </Card>
       );
    }
});
module.exports = MyCard;
