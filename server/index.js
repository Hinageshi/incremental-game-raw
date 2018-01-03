var server = require("./server");
var router = require("./router");
var requestHandler = require("./request_handler")
var handle = {};

//handle["/"] = requestHandler.save;
handle["/save"] = requestHandler.save;
handle["/load"] = requestHandler.load;

server.start(router.route, handle)