const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//Connection String
const dbConnection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db
});

//Post request to create short url and add to db
app.post("/createuser", function(req, res) {
  let userName = req.body.user;

  if (userName) {
    //Generate random verbiage
    let userId = Math.random()
      .toString(36)
      .substring(2, 7);

    //Sql query
    let query1 = `insert into Workout(username, userId) values('${userName}', '${userId}')`;

    dbConnection.query(query1, function(err, result, fields) {
      if (err) throw err;
    });
    //Json data send to client side
    res.json("User was Added");
  }
});

app.post("/userdata", function(req, res) {
  let userName = req.body.user;
  let descript = req.body.descript;
  let minutes = req.body.min;
  let date = req.body.date;

  //Sql query
  let query2 = `update Workout set description = '${descript}', minutes = '${minutes}', date = '${date}' where username = '${userName}'`;
  let query3 = "select* from Workout where username = ?";

  if (descript) {
    dbConnection.query(query3, [userName], function(err, result, fields) {
      if (err) throw err;

      if (result.length > 0) {
        if (userName) {
          dbConnection.query(query2, function(err, result, fields) {
            if (err) throw err;
          });
        }
      }
    });

    //Json data send to client side
    res.json("Description was Added");
  }
});

/*--------------------Routing Over----------------------------*/

app.listen(3001, function() {
  console.log("Node is Running on port 3001");
});
