var express = require('express');
var logger = require('morgan');


var app = express();

app.set('view engine', 'ejs');

app.use(express.static('views'));
app.set('views', __dirname + 'views');
app.use(logger('dev'));

app.get('/addImagePose', function(req, res){
   res.redirect('imagePose.html');
});
app.get('/dataCategoryImage', function(req, res){
    res.redirect('dataCategoryImage.html');
 });
var port = process.env.PORT || 8080

app.listen(port, function(){ 
    console.log('App running on port'+ port)
});