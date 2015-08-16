var React = require('react');
var mui = require('material-ui'),
ThemeManager = new mui.Styles.ThemeManager(),
AppBar = mui.AppBar,
FontIcon = mui.FontIcon,
IconButton = mui.IconButton;
var Card = mui.Card,
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
    render: function() {
       return (
        <div>
           <AppBar
                title="Xin"
                //iconClassNameRight="muidocs-icon-navigation-expand-more"
                iconElementRight={<IconButton iconClassName="muidocs-icon-custom-github" tooltip="GitHub"/>}
                style={{position:"fixed",top:"0"}}
                />
            <Card style={{width:"50%",margin:"80px auto",position:"relative"}}>
               <CardHeader
                 title="first article coming to boom!"
                 subtitle="start to write"
                 avatar={<Avatar>Xin</Avatar>}/>
               <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
                 <img src="http://lorempixel.com/600/337/nature/"/>
               </CardMedia>
               <CardTitle title="Title" subtitle="Subtitle"/>
               <CardActions>
                 <FlatButton label="评论"/>
               </CardActions>
               <CardText>
                 还是准备写点东西，做下读书笔记
               </CardText>
             </Card>
        </div>
       );
    }
});
React.render(<MyCard />,document.getElementById('main'));
