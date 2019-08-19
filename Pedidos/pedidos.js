var express = require("./express");
var app = express();

app.use(cors());

   //APIS para la consulta de informacion de pollo vivo-----------------------------------------------------------------------------------------------------------------------------
app.get("/Pedidos/", function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      // query to the database and get the data
      request.query( "SELECT Granja,Nombre FROM nuICCapdeCas GROUP BY Granja,Nombre order by Granja DESC",
        function(err, recordsets) {
          if (err) {
            console.log(err);
          } else {
            res.writeHead(200, { "Content-type": "application/json" });
            res.write(JSON.stringify(recordsets.recordset));
          }
          res.end();
          sql.close();
        }
      );
    });
  })
