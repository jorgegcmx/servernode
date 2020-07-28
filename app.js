var express = require("express");
var Tanques=require("./Gas/Tanques");
var SalidaTipoPollo=require("./SalidasTipoPollo/apiGraficas");
var DatosPolloVivo=require("./DatosPolloVivo/apiDatosPolloVivo");


var app = express();
var sql = require("mssql");
var cors = require("cors");

// config for your database
app.use(cors());

var fig = require("./settings");
console.log(fig);

config = {
  user: "master",
  password: "",
  server: "192.1.1.218",
  database: "AGQSLAPP"
};


app.use('/Gas',Tanques);
app.use('/SalidasTipoPollo',SalidaTipoPollo);
app.use('/DatosPollo',DatosPolloVivo);




app.get("/ventas/:mes1/:mes2/:annio", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query( "select convert(varchar(10),TranDate,105) as Fecha,convert(decimal,SUM(Qty)) kilos from INTran where InvtID between 'PLL1000' and 'PLL1599' and MONTH(TranDate) between '" +
        req.params.mes1 + "' and '" +req.params.mes2 + "' and YEAR(TranDate)='" +req.params.annio + "' AND TranType='II' group by TranDate",
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




//server node js
var server = require("http").Server(app);
var port = process.env.port || 8000;
server.listen(port, function(req, res) {
  console.log("Listening on port %d", server.address().port);
});

