var express = require('express');
var songRouter = express.Router();
const {addSongUrl, addSongCover, getSongDetails,getSongs,getDetails, getSongToUpdate, getClicksByMonth} = require("../controllers/song-controller");

songRouter.post('/addSong',addSongUrl);
songRouter.post('/addSongCover/:id',addSongCover)
songRouter.post('/getSongDetails/:id',getSongDetails)
songRouter.post('/getSongs',getSongs)
songRouter.post('/getDetails',getDetails)
songRouter.get('/getSongToUpdate/:id',getSongToUpdate)
songRouter.get('/getClicksByMonth/:month/:id',getClicksByMonth);

module.exports = songRouter;
