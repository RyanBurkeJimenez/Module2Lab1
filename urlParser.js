const httpServer = require("http");
const url = require("url");
/////////////////////////////////////
//Create Server
const server = httpServer.createServer(function (req, res) {

    const urlParameter = url.parse(req.url, true);
    console.log(urlParameter.query);
    console.log(urlParameter.pathname);
    res.end(`We received our first request from the client`);
});




server.listen(8000, "localhost", function () {
  console.log("Listening to requests on port 8000");
});

