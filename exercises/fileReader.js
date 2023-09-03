const httpServer = require("http");
const url = require("url");
const fs = require('fs'); 

/// Read data from file
//Template
const tempCourse = fs.readFileSync(
    `../data/data.txt`,
    'utf-8'
);
/////////////////////////////////////
//Create Server
const server = httpServer.createServer(function (req, res) {
  const urlParameter = url.parse(req.url, true);
  console.log(urlParameter.query);
  console.log(urlParameter.pathname);

  if (urlParameter.query.id) {
    //if there is query parameter named id
    //Courses page
    if ( urlParameter.pathname === "/" ||urlParameter.pathname.toLowerCase() === "/courses") {
      res.writeHead(200, {
        //everything ran successfully
        "Content-type": "text/html",
      });
      res.end(`We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id }
      ${tempCourse}`);
    }
  
    else {
    res.writeHead(404, { //Server did not find what you were looking for
      "Content-type": "text/html",
    });
    res.end(`Resource not found`); //Print screen if resource not found
  }
}
});

server.listen(8000, "localhost", function () {
  console.log("Listening to requests on port 8000");
});
