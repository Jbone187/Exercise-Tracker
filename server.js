const bodyParser = require("body-parser");

const express = require("express");
const mysql = require("mysql");
//const url = process.env.url;
const dotenv = require("dotenv");
const app = express();
// dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//Connection String
/*  const dbConnection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db
});
*/

//Post request to create short url and add to db
app.post("/", function(req, res) {
  let userName = req.body.user;

  if (userName) {
    //Generate random verbiage
    let userId = Math.random()
      .toString(36)
      .substring(2, 7);

    //Sql query
    let query1 = `insert into String(Link, Short) values('${userName}', '${userId}')`;

    dbConnection.query(query1, function(err, result, fields) {
      if (err) throw err;
    });
    //Json data send to client side
    res.json("User Add to DB");
  }
});

// Get request that allow created url to do redirct to url stored on db
app.get("/:id", function(req, res) {
  let query2 = "select* from string where Short = ?";

  dbConnection.connect(function(error) {
    dbConnection.query(query2, [req.params.id], function(
      error,
      result,
      fields
    ) {
      if (error) {
        res.send({
          code: 400,
          failed: "DB Error Ocurred"
        });
      }
      // Searches DB for results associated with query
      if (result.length > 0) {
        if (req.params.id) {
          res.redirect(result[0].Link);
        }
      } else {
        res.send({
          code: 500,
          failed: "DB Error Ocurred"
        });
      }
    });
  });
});

/*--------------------Routing Over----------------------------*/

app.listen(3001, function() {
  console.log("Node is Running on port 3000");
});