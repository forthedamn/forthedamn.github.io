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
    getInitialState: function () {
      return {
        imgTitle: "",
        imgSubtitle: "",
        cardTitle: "",
        cardSubtitle: "",
        cardText: ""
      }
    },
    componentDidMount: function () {
      var _this = this;
      var num = this.props.src;
      $.ajax("../page/pagePackage.json").then(function(data,status,XHR){
        var result = data[num];
        _this.setState({
          imgTitle: result.imgTitle,
          imgSubtitle: result.imgSubtitle,
          cardTitle: result.cardTitle,
          cardSubtitle: result.cardSubtitle,
          cardText: result.cardAbstract
        })
      })
    },
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
              return (<CardMedia overlay={<CardTitle title={this.state.imgTitle} subtitle={this.state.imgSubtitle}/>}>
                <img src={imgSrc}/>
              </CardMedia>);
            }()
          }
      // 文件名
      var htmlName = {htmlName: this.props.name};
       return (
            <Card style={{width:"50%",margin:"70px auto",position:"relative"}}>
              <CardHeader
                 title={this.state.cardTitle}
                 subtitle={this.state.cardSubtitle}
                 avatar={<Avatar>Xin</Avatar>}/>
                 {mediaNode}
              <CardText>
                {this.state.cardText}
              </CardText>
              <CardActions>
                <MyLinkButton label="阅读全文" location="pages" params={htmlName}/>
              </CardActions>
             </Card>
       );
    }
});
module.exports = MyCard;
