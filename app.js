var express = require("express");
var pedidos=require("./pedidos/pedidos");


var app = express();
var sql = require("mssql");
var cors = require("cors");

// config for your database
app.use(cors());

var config = {
  user: "master",
  password: "",
  server: "192.1.1.218",
  database: "AGQSLAPP"
};



app.use('/pedidos', pedidos);



app.get("/Requisiciones/:id", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    //const id = request.params.id;
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select * from nurqReqHdr (nolock) where BatNbr ='" + req.params.id + "'",
      function(err, recordsets) {
        if (err) {
          console.log(err);
          // send data as a response
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
app.get("/partidas/:BatNbr", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select * from nurqReqDet (nolock) WHERE  BatNbr='" +
        req.params.BatNbr +
        "'",
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

app.get("/requipadre/:RegistroID", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query("exec rqpadre'" + req.params.RegistroID + "'", function(
      err,
      recordsets
    ) {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-type": "application/json" });
        res.write(JSON.stringify(recordsets.recordset));
      }
      res.end();
      sql.close();
    });
  });
});

app.get("/orden/:RegistroID_padre", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "exec ordcompra'" + req.params.RegistroID_padre + "'",
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
app.get("/reception/:RegistroID_padre", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "exec reception'" + req.params.RegistroID_padre + "'",
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

app.get("/factura/:Reffac", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select convert(varchar(10),InvcDate,103) as Fecha1,convert(varchar(10),User7,103) as Recep,convert(varchar(10),User8,103) as RecepTeso,* from apdoc where ponbr='" +
        req.params.Reffac +
        "'",
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

app.get("/detallefactura/:Reffac", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select * from aptran where InvtID<>'' and BatNbr='" +
        req.params.Reffac +
        "'",
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

app.get("/fac/:lote", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select * from batch where batnbr='" + req.params.lote + "'",
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

app.get("/Tanques/", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select convert(decimal,PorceCorrecto-movimiento) as div,* from PorcentajesTanques order by div desc",
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


app.get("/Tanques/:almacen", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select convert(decimal,PorceCorrecto-movimiento)as div ,* from PorcentajesTanques where almacen LIKE '" +
        req.params.almacen +
        "%' order by div desc",
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
app.get("/Salidas/:almacen/:tanque/:fecha", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
 "SELECT  SiteID AS ALMACEN_GAS, WhseLoc AS LOCALIZACION_GAS, TranDate AS FECHA_TRANSACCION, Crtd_DateTime AS FECHA_GENERACION_TRANSACCION,  Qty AS CONSUMO_POR_CASETA FROM INTran WHERE SiteID='" + req.params.almacen + "' AND WhseLoc= '" +req.params.tanque + "' AND TranDate='" +req.params.fecha + "' AND TranType='II'",
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

app.get("/Semana/:semana", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select * from nurqReqHdr  WHERE user2 in ('MEDYVAC','QUIMICO','ARTLIMP') and divSolic in ('PE','DC','RA','INC') and s4Future02 = '" +
        req.params.semana +
        "'",
      function(err,recordsets) {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, { "Content-type": "application/json" });
          res.write(JSON.stringify(recordsets));
        }
        res.end();
        sql.close();
      }
    );
  });
});





app.get("/ventas/:mes1/:mes2/:annio", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
 "select convert(varchar(10),TranDate,105) as Fecha,convert(decimal,SUM(Qty)) kilos from INTran where InvtID between 'PLL1000' and 'PLL1599' and MONTH(TranDate) between '" +
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
app.get("/nutryfacil/:mes1/:mes2/:annio", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
 "select MONTH(TranDate) as Fecha,SUM(Qty)as kilos from INTran (nolock) where InvtID between 'PLL1000' and 'PLL1599' and MONTH(TranDate) between '" +
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

app.get("/pollo10/:mes1/:mes2/:annio", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
 "select MONTH(TranDate) as Fecha,SUM(Qty)as kilos from INTran (nolock) where InvtID ='PLL0110'  and MONTH(TranDate) between '" +
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
app.get("/pollo9/:mes1/:mes2/:annio", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
 "select MONTH(TranDate) as Fecha,SUM(Qty)as kilos from INTran (nolock) where InvtID ='PLL0109'  and MONTH(TranDate) between '" +
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
//APIS para la consulta de informacion de pollo vivo-----------------------------------------------------------------------------------------------------------------------------
app.get("/Granjas/", function(req, res) {
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
});
app.get("/Casetas/:Granja", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query("SELECT NumIDCaseta,Modulo,Caseta,Granja,Nombre,ITS.SiteID,ITS.InvtID,ITS.QtyAvail,ITS.AvgCost,IV.Descr,G.Proyecto FROM ItemSite ITS INNER JOIN Inventory IV on ITS.InvtID=IV.InvtID INNER JOIN nuICCapdeCas G on G.AlmacenCas=ITS.SiteID WHERE Granja='"+req.params.Granja+"' AND ITS.InvtID IN('PLO0001','PLO0002','PLO0003','PLE0001') AND  ITS.QtyAvail<>0  GROUP BY NumIDCaseta,Modulo,Caseta,Granja,Nombre,ITS.SiteID,ITS.InvtID,ITS.QtyAvail,ITS.AvgCost,IV.Descr,G.Proyecto ORDER BY Granja DESC ",
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


app.get("/ordenes/:Lote", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select * from PurchOrd ORH (nolock) where ORH.PONbr='" + req.params.Lote + "'",
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

app.get("/ordenespartidas/:Lote", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "select * from purorddet ORD (nolock) where ORD.PONbr='" + req.params.Lote + "'",
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

app.get("/datosrequi/:Idregistropadres", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();
    // query to the database and get the data
    request.query(
      "exec datosRequi '" + req.params.Idregistropadres + "'",
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




/*app.get("/Pedidos/", function(req, res) {
  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);
    // create Request object
    var data = [];
    var request = new sql.Request();

    var hoy = new Date();
    dia = (hoy.getDate()-1); 
    mes = hoy.getMonth();
    anio= hoy.getFullYear();
    fecha_actual = String(anio+"-"+mes+"-"+dia);
    // query to the database and get the data
    request.query( "Select Status, Count(*) as Cantidad From Batch Where Module = 'IN' And BatNbr In (Select LoteSal from nudcPedPolProHdr Where Status = 'F' And Fecha = '" +fecha_actual+ "') Group by Status",
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
});*/


//server node js
var server = require("http").Server(app);
var port = process.env.port || 8000;
server.listen(port, function(req, res) {
  console.log("Listening on port %d", server.address().port);
});

