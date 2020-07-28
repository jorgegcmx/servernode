var express = require("express");
var router = express.Router();

var app = express();
var sql = require("mssql");

router.get("/nutryfacil/:mes1/:mes2/:annio", function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      // query to the database and get the data
      request.query("select MONTH(TranDate) as Fecha,SUM(Qty)as kilos from INTran (nolock) where InvtID between 'PLL1000' and 'PLL1599' and MONTH(TranDate) between '" +
          req.params.mes1 + "' and '" +req.params.mes2 + "' and YEAR(TranDate)='" +req.params.annio + "' AND TranType='II' group by MONTH(TranDate) order by Fecha",
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
  });   
  
  router.get("/pollo10/:mes1/:mes2/:annio", function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      // query to the database and get the data
      request.query("select MONTH(TranDate) as Fecha,SUM(Qty)as kilos from INTran (nolock) where InvtID ='PLL0110'  and MONTH(TranDate) between '" +
          req.params.mes1 + "' and '" +req.params.mes2 + "' and YEAR(TranDate)='" +req.params.annio + "' AND TranType='II' group by MONTH(TranDate) order by Fecha",
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
  });
  
  router.get("/pollo9/:mes1/:mes2/:annio", function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      // query to the database and get the data
      request.query("select MONTH(TranDate) as Fecha,SUM(Qty)as kilos from INTran (nolock) where InvtID ='PLL0109'  and MONTH(TranDate) between '" +
          req.params.mes1 + "' and '" +req.params.mes2 + "' and YEAR(TranDate)='" +req.params.annio + "' AND TranType='II' group by MONTH(TranDate) order by Fecha",
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
  });
  module.exports = router;