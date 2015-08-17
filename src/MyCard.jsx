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
    childContextTypes: {
      muiTheme: React.PropTypes.object
    },
    getChildContext: function() {
      return {
        muiTheme: ThemeManager.getCurrentTheme()
      };
    },
    getInitialState: function () {
      return {
        imgTitle: "",
        imgSubtitle: "",
        imgSrc: "",
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
          imgSrc: result.imgSrc || "http://lorempixel.com/600/337/nature/",
          cardTitle: result.cardTitle,
          cardSubtitle: result.cardSubtitle,
          cardText: result.cardAbstract
        })
      })
    },
    clickHanler: function() {
      alert('');
    },
    render: function() {
       return (
            <Card style={{width:"50%",margin:"70px auto",position:"relative"}}>
              <CardHeader
                 title={this.state.cardTitle}
                 subtitle={this.state.cardSubtitle}
                 avatar={<Avatar>Xin</Avatar>}/>
              <CardMedia overlay={<CardTitle title={this.state.imgTitle} subtitle={this.state.imgSubtitle}/>}>
                <img src={this.state.imgSrc}/>
              </CardMedia>
              <CardText>
                {this.state.cardText}
              </CardText>
              <CardActions>
                <FlatButton label="阅读全文" onClick={this.clickHanler}/>
              </CardActions>
             </Card>
       );
    }
});
module.exports = MyCard;
