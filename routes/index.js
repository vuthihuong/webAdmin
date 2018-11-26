var firebase = require('firebase');
var app = firebase.initializeApp({ 
    apiKey: "AIzaSyCnKHP42pOqDkrz5IlAW513pEvPZcQCVb8",
    authDomain: "photoapp-859b5.firebaseapp.com",
    databaseURL: "https://photoapp-859b5.firebaseio.com",
    projectId: "photoapp-859b5",
    storageBucket: "photoapp-859b5.appspot.com",
    messagingSenderId: "429622908808"
 });

var express = require('express');
var router = express.Router();
var multer  = require('multer');
const path = require('path');
// var upload = multer({ dest: 'views/uploads/'})

var https = require('https');
var crypto = require('crypto');
var Flickr = require("flickrapi");

const storage = multer.diskStorage({ 
    destination: './views/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '' + Date.now() + path.extname(file.originalname));
     }
})
const upload = multer({ 
    storage: storage
}).single('myImage')
router.get('/', function(req, res, next){ 
    res.render('uploadExp', {
        title: 'Express',
       
    })
});
router.post('/',   (req, res) => { 
    upload(req, res, async (err) => {
        console.log(req.body)
       var a =  req.body;
        if(err){ 
            res.render('uploadExp', { 
                msg: err
            });
        }
        else { 
            if(req.file == undefined){ 
                res.render('uploadExp', { 
                    msg: 'Error no file'
                });
            }
            else { 
                res.render('uploadExp', { 
                    msg: 'File uploaded',
                   
                    file: `views/uploads/${req.file.filename}`
                });
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
                        photo: "views/uploads/"+  `${req.file.filename}`
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
                    // res.send({ "result": linkImage })
                    console.log(linkImage);
                    
                  
                        app.database().ref('ImageFlick').child(a.category).push(linkImage);
                   
                   
                  
                   
                })
            }
        }
       
    })
    
 
    // res.send(req.files)
    // var result = req.files.find(obj => {
    //     return obj.originalname;
    //   })
    //   res.send(result.originalname)
    // //   upload.array(file.originalname);
    
    
  

});

module.exports = router;