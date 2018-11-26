var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'views/uploads/'})

router.get('/', function(req, res, next){ 
    res.render('uploadExp', {title: 'Express'})
});

var https = require('https');
var crypto = require('crypto');
var Flickr = require("flickrapi");


router.post('/', upload.any(), async function(req, res, next){ 
    // res.send(req.files)
    var result = req.files.find(obj => {
        return obj.originalname;
      })
      res.send(result.originalname)
    //   upload.array(file.originalname);
    
    
    flickrOptions = {
        api_key: "3bfb72007e1061d8ac6893be02e7180a",
        secret: "0c89cc592fd4a7d4",
        user_id: "161343894@N08",
        access_token: "72157702392898345-d10793d50873ee02",
        access_token_secret: "c1c201acf0a4eee5",
        permissions: 'delete'
    };
  
    var endPost = false;
    var uploadOptions = {
        photos: [{
            title: "test",
            tags: [
                "happy fox",
                "test 1"
            ],
            photo: "views/uploads/" + result.originalname
        }]
    };

    var link = "";
    var value;
    await Flickr.upload(uploadOptions, flickrOptions, async function (err, result) {
        value = result;
        var Flickr = require("flickr-sdk");
        var flickr = new Flickr("3bfb72007e1061d8ac6893be02e7180a");
        console.log(value)
        await flickr.photos.getSizes({
            photo_id: value[0]
        }).then(function (res) {
            link = res.body;
        }).catch(function (err) {
            res.send({ "error": err })
            endPost = true;
        })
        if (endPost) return;
        var urls = link.sizes.size;
        var linkImage = urls[urls.length - 1]["source"]
        res.send({ "result": linkImage })
    })

});

module.exports = router;