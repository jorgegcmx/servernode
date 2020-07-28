var express = require("express");
var router = express.Router();

var app = express();
var sql = require("mssql");

router.get('/Tanques', function (req, res) {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select convert(decimal,PorceCorrecto-movimiento) as div,* from PorcentajesTanques order by div desc",
      function (err, recordsets) {
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

router.get("/Tanques/:almacen", function (req, res) {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select convert(decimal,PorceCorrecto-movimiento)as div ,* from PorcentajesTanques where almacen LIKE '" +
      req.params.almacen +
      "%' order by div desc",
      function (err, recordsets) {
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


router.get("/Salidas/:almacen/:tanque/:fecha", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query("SELECT  SiteID AS ALMACEN_GAS, WhseLoc AS LOCALIZACION_GAS, TranDate AS FECHA_TRANSACCION, Crtd_DateTime AS FECHA_GENERACION_TRANSACCION,  Qty AS CONSUMO_POR_CASETA FROM INTran WHERE SiteID='" + req.params.almacen + "' AND WhseLoc= '" +req.params.tanque + "' AND TranDate='" +req.params.fecha + "' AND TranType='II'",
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



