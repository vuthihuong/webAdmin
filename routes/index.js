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
var multer = require('multer');
const path = require('path');
// var upload = multer({ dest: 'views/uploads/'})

var https = require('https');
var crypto = require('crypto');
var Flickr = require("flickrapi");

const storage = multer.diskStorage({
    destination: './views/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
}).single('myImage')
router.get('/', function (req, res, next) {
    res.render('uploadExp', {
        title: 'Express',

    })
});
router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        console.log(req.body)
        var a = req.body;
        if (err) {
            res.render('uploadExp', {
                msg: err
            });
        }
        else {
            if (req.file == undefined) {
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
                        photo: "views/uploads/" + `${req.file.filename}`
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
                    console.log(linkImage);
                    var groupPerson = '';
                    var gender = '';
                    var age = '';
                    var clother = ''
                    if (a.GroupPerson == 'Một người') {
                        groupPerson = "OnePerson"
                    }
                    else if (a.GroupPerson == 'Hai người') {
                        groupPerson = "TwoPerson"
                    }
                    else if (a.GroupPerson == "Nhóm người") {
                        groupPerson = "GroupPerson"
                    }
                    if (a.Gender == "Nam") {
                        gender = "Male"
                    }
                    else if (a.Gender == "Nữ") {
                        gender = "Female"
                    }
                    else if (a.Gender == "Nam - Nam") {
                        gender = "DoubleMale"
                    }
                    else if (a.Gender == "Nam - Nữ") {
                        gender = "MaleFemale"
                    }
                    else if (a.Gender == "Nữ - Nữ") {
                        gender = "DoubleFemale"
                    }

                    if (a.Age == "Thiếu nhi") {
                        age = "Baby"
                    }
                    else if (a.Age == "Thiếu niên") {
                        age = "Youth"
                    }
                    else if (a.Age == "Thanh niên") {
                        age = "Volunteer"
                    }
                    else if (a.Age == 'Trung niên') {
                        age = "MiddleAge"
                    }
                    else if (a.Age == 'Người cao tuổi') {
                        age = 'OldAge'
                    }
                    else if (a.Age == "Thiếu nhi - Thiếu niên") {
                        age = 'BabyYouth'
                    }
                    else if (a.Age == "Thiếu nhi - Thanh niên") {
                        age = 'BabyVolunteer'
                    }
                    else if (a.Age == "Thiếu nhi - Trung niên") {
                        age = 'BabyMiddleAge'
                    }
                    else if (a.Age == "Thiếu nhi - Người cao tuổi") {
                        age = 'BabyOldAge'
                    }
                    else if (a.Age == "Thiếu niên - Thanh niên") {
                        age = 'YouthVolunteer'
                    }
                    else if (a.Age == "Thiếu niên - Trung niên") {
                        age = 'YouthMiddleAge'
                    }
                    else if (a.Age == "Thiếu niên - Người cao tuổi") {
                        age = 'YouthOldAge'
                    }
                    else if (a.Age == "Thanh niên - Trung niên") {
                        age = "VolunteerMiddleAge"
                    }
                    else if (a.Age == "Thanh niên - Người cao tuổi") {
                        age = "VolunteerOldAge"
                    }
                    else if (a.Age == "Trung niên - Người cao tuổi") {
                        age = "MiddleOldAge"
                    }

                    if (a.Clother == "Áo dài") {
                        clother = "AoDai"
                    }
                    if (a.Clother == "Áo khoác") {
                        clother = "Coat"
                    }
                    if (a.Clother == "Đồng phục học sinh") {
                        clother = "UniformStudent"
                    }
                    if (a.Clother == "Đồng phục công sở") {
                        clother = "UniformComple"
                    }
                    if (a.Clother == "Quần áo thể thao") {
                        clother = "UniformPlay"
                    }
                    if (a.Clother == "Comple") {
                        clother = "Comple"
                    }
                    if (a.Clother == "Váy") {
                        clother = "Skirt"
                    }
                    if (a.Clother == "Mũ, nón") {
                        clother = "Hat"
                    }
                    if (a.Clother == "Ô") {
                        clother = "Umbrella"
                    }
                    if (a.Clother == "Túi xách") {
                        clother = "HandBag"
                    }
                    if (a.Clother == "Điện thoại") {
                        clother = "Phone"
                    }
                    if (a.Clother == "Ba lô hai dây") {
                        clother = "StringBag"
                    }
                    if (a.Clother == "Ba lô dây chéo") {
                        clother = "CrossBag"
                    }
                    if (a.Clother == "Bóng bay") {
                        clother = "Balloon"
                    }
                    if (a.Clother == "Bó hoa") {
                        clother = "Flower"
                    }
                    if (a.Clother == "Xe đạp") {
                        clother = "Cycle"
                    }
                    if (a.Clother == "Quả bóng") {
                        clother = "Ball"
                    }
                    if (a.Clother == "Sổ cầm tay") {
                        clother = "Book"
                    }
                    if (a.Clother == "Hồ, sông, biển") {
                        clother = "Beach"
                    }
                    if (a.Clother == "Đầm sen") {
                        clother = "Lotus"
                    }
                    if (a.Clother == "Núi") {
                        clother = "Mountain"
                    }
                    if (a.Clother == "Cầu thang") {
                        clother = "Stair"
                    }
                    if (a.Clother == "Khung cửa") {
                        clother = "Door"
                    }
                    if (a.Clother == "Công viên") {
                        clother = "Park"
                    }
                    if (a.Clother == "Cây cối") {
                        clother = "Tree"
                    }
                    if (a.Clother == "Đứng") {
                        clother = "Stand"
                    }
                    if (a.Clother == "Ngồi") {
                        clother = "Seat"
                    }
                    if (a.Clother == "Nằm") {
                        clother = "Lie"
                    }
                    if (a.Clother == "Tựa") {
                        clother = "Base"
                    }
                    if (a.Clother == "Nghiêng người") {
                        clother = "TurnCircle"
                    }
                    if (a.Clother == "Đi") {
                        clother = "Go"
                    }
                    if (a.Clother == "Bám") {
                        clother = "Cling"
                    }
                    if (a.Clother == "Bật cao") {
                        clother = "Jump"
                    }
                    if (a.Clother == "Chạy") {
                        clother = "Run"
                    }
                    app.database().ref('ImageFlick').child(groupPerson)
                        .child(gender).child(age).child(clother).push({
                            uri: linkImage
                        });
                })
            }
        }

    })
});

module.exports = router;