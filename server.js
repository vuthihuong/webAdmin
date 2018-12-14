var express = require('express');
var logger = require('morgan');

var routes = require('./routes/index')
var app = express();


app.set('view engine', 'ejs');
app.use(express.static('views'));
// app.set('views', __dirname + 'views');

app.use(logger('dev'));

app.get('/addImagePose', function(req, res){
   res.redirect('imagePose.html');
});
app.get('/dataCategoryImage', function(req, res){
    res.redirect('dataCategoryImage.html');
 });
app.get('/dataAddress', function(req, res){ 
    res.redirect('dataAddress.html')
});
app.get('/dataAddressTown', function(req, res){ 
    res.redirect('dataAddressTown.html')
});
app.get('/dataCategoryPostPhoto', function(req, res){ 
    res.redirect('dataCategoryPostPhoto.html')
});
app.get('/dataImagePose', function(req, res){ 
    res.redirect('dataImagePose.html')
});
app.get('/dataTableCostImg', function(req, res){ 
    res.redirect('dataTableCostImg.html')
});
app.get('/dataHeightSearch', function(req, res){ 
    res.redirect('dataHeightSearch.html')
});

 app.use('/', routes);
var port = process.env.PORT || 8080

app.listen(port, function(){ 
    console.log('App running on port'+ port)
});