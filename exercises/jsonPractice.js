const httpServer = require("http");
const url = require("url");
const fs = require('fs'); 

/// Read data from file
//Template
const tempCourse = fs.readFileSync(
    `../data/data.json`,
    'utf-8'
);

const dataObj = JSON.parse(tempCourse); //String to JavaScript object
/////////////////////////////////////
//Create Server
const server = httpServer.createServer(function (req, res) {
  const urlParameter = url.parse(req.url, true);
  console.log(urlParameter.query);
  console.log(urlParameter.pathname);

  if (urlParameter.query.id) {  //if there is query parameter named id read as string
    //Courses page
    if ( urlParameter.pathname === "/" ||urlParameter.pathname.toLowerCase() === "/courses") {
      res.writeHead(200, { //everything ran successfully
        "Content-type": "text/html",
      });
      const course = dataObj[Number(urlParameter.query.id)];//Convert id to int to use data.JSON file
      res.end(`We have received our first request from the client at resource ${urlParameter.pathname} with query parameter ${urlParameter.query.id}.
      Course information for option ${Number(urlParameter.query.id) + 1} is ${JSON.stringify(course)}`); //JSON.stringify() turns objects into strings
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
