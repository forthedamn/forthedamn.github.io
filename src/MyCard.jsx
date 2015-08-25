var React = require("react");
var $ = require("jquery");
var mui = require("material-ui"),
ThemeManager = new mui.Styles.ThemeManager(),
FontIcon = mui.FontIcon,
IconButton = mui.IconButton,
Card = mui.Card,
CardHeader = mui.CardHeader,
CardMedia = mui.CardMedia,
CardTitle = mui.CardTitle,
CardActions = mui.CardActions,
CardText = mui.CardText,
FlatButton = mui.FlatButton,
Avatar = mui.Avatar;

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
      $.ajax("../page/"+_this.props.src+".json").then(function(data,status,XHR){
        var result = data;
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
      var page = this.props.src;
      this.props.readMoreClickHandler(page);
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
                <FlatButton label="阅读全文" onClick={this.readMoreClickHandler}/>
              </CardActions>
             </Card>
       );
    }
});
module.exports = MyCard;
