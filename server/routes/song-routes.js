var express = require('express');
var songRouter = express.Router();
const {addSongUrl, addSongCover, getSongDetails} = require("../controllers/song-controller")

songRouter.post('/addSong',addSongUrl);
songRouter.post('/addSongCover/:id',addSongCover)
songRouter.post('/getSongDetails/:id',getSongDetails)
module.exports = songRouter;
