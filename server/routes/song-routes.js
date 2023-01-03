var express = require('express');
var songRouter = express.Router();
const {addSongUrl, addSongCover, getSongDetails,getSongs,getDetails} = require("../controllers/song-controller");

songRouter.post('/addSong',addSongUrl);
songRouter.post('/addSongCover/:id',addSongCover)
songRouter.post('/getSongDetails/:id',getSongDetails)
songRouter.post('/getSongs',getSongs)
songRouter.post('/getDetails',getDetails)
module.exports = songRouter;
