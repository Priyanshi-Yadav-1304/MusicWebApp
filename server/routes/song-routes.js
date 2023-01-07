var express = require('express');
var songRouter = express.Router();
const {addSongUrl, addSongCover, getSongDetails,getSongs,getDetails, getSongToUpdate, getClicksByMonth, checkSong} = require("../controllers/song-controller");
const isLoggedIn = require('../middlewares/isLoggedIn');

songRouter.post('/addSong',addSongUrl);
songRouter.post('/addSongCover/:id',isLoggedIn,addSongCover)
songRouter.post('/getSongDetails/:id',getSongDetails)
songRouter.post('/getSongs',getSongs)
songRouter.post('/getDetails',getDetails)
songRouter.get('/getSongToUpdate/:id',getSongToUpdate)
songRouter.get('/getClicksByMonth/:month/:id',getClicksByMonth);
songRouter.get('/checkSong/:id',checkSong);

module.exports = songRouter;
