var express = require('express');
var serviceRouter = express.Router();
const {addService, getService, deleteService} = require("../controllers/service-controller")

serviceRouter.post('/addService',addService);
serviceRouter.get('/getService',getService)
serviceRouter.post('/deleteService',deleteService)

module.exports = serviceRouter;