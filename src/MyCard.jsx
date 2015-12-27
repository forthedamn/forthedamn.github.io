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
FontIcon = mui.FontIcon;


var MyLinkButton = require("./MyLinkButton.jsx");

var MyCard = React.createClass({
      propTypes: {
        // 文章类型
        tagType: React.PropTypes.instanceOf(Array)
      },
      getInitialState() {
        return {
          cardWidth: '60%'
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
              cardWidth: '60%'
            })
          }
        }.bind(this),false)
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
              return (<CardMedia overlay={<CardTitle title={this.props.imgTitle} subtitle={this.props.imgSubtitle}/>}>
                <img src={imgSrc}/>
              </CardMedia>);
            }()
          }
      // 文件名
      var htmlName = {htmlName: this.props.htmlName};
      // tag标签
      var tagNode = this.props.tagType.map(function(v,k){
		  // 类型标签的需要放到一个对象中，对象名为react-route中的地址参数
		  var type = {type:v};
        return (<span style={{padding:'0 5px',cursor:'pointer'}}>
  				  <MyLinkButton label={v} location="directory" type='typeTag' params={type}/>
                </span>
          )
      })
      var cardStyle = {
        width: this.state.cardWidth,
        margin:"70px auto",
        position:"relative"
      }
       return (
            <Card style={cardStyle}>
              <CardHeader
                 style={{fontSize:"16px",fontWeight:'900',
                    overflow:'hidden',textOverflow:'ellipsis',
                    whiteSpace:'nowrap'
                  }}
                 title={this.props.cardTitle}
                 subtitle={this.props.cardSubtitle}
                 avatar={<Avatar src='src/images/cardIcon.jpg'></Avatar>}/>
                 {mediaNode}
              <CardText>
                {this.props.cardAbstract}
              </CardText>
              <CardActions>
                <MyLinkButton label="阅读全文" location="pages" params={htmlName}/>
              </CardActions>
                <div style={{left:"130px",top:"39px",
                color:'#777',fontSize:'10px',position:"absolute"}}>
                <i className="fa fa-tags" ></i>
                {tagNode}
                </div>
             </Card>
       );
    }
});
module.exports = MyCard;
