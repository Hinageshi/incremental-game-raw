var url = require('url');
var fs = require('fs');
var querystring = require("querystring");
//var json = require('jsonfile');


function save(response, request) {
    console.log("\"save\" called.");

    var params = querystring.parse(url.parse(request.url).query);
    
    console.log(params);

    response.setHeader("Access-Control-Allow-Origin","*");
    fs.writeFile(params["name"], params['json'], 'utf8', function(err){
        if (err){
            console.log("erreur json");
            response.writeHead(500, {"Content-type": "text/plain"});
            response.end();
        } else {
            console.log("réussi");
            response.writeHead(200, {"Content-type": "text/plain"});
            response.end();
        }
    });
    
}

function load(response, request){
    console.log("\"load\" called.");

    var params = querystring.parse(url.parse(request.url).query);

    console.log(params);
    response.setHeader("Access-Control-Allow-Origin","*");
    var json = fs.readFileSync(params['file'], 'utf8');
    console.log(json);
    response.writeHead(200, {"Content-type": "application/json"});
    response.write(json);
    response.end();
}

exports.save = save;
exports.load = load;