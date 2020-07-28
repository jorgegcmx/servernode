
var express = require("express");
var router = express.Router();

var app = express();
var sql = require("mssql");

//APIS para la consulta de informacion de pollo vivo-----------------------------------------------------------------------------------------------------------------------------
router.get("/Granjas/", function(req, res) {
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
  
  router.get("/Casetas/:Granja", function(req, res) {
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
  
  
  
  
  //APIS DE GET PARA EL RASTREO DE PROYECTOS PE
  
  router.get("/CostoPollo/:IdCaseta", function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      // query to the database and get the data
      request.query("SELECT NumIDCaseta,Modulo,Caseta,Granja,Nombre,ITS.SiteID,ITS.InvtID,ITS.QtyAvail,ITS.AvgCost,IV.Descr,G.Proyecto FROM ItemSite ITS INNER JOIN Inventory IV on ITS.InvtID=IV.InvtID INNER JOIN nuICCapdeCas G on G.AlmacenCas=ITS.SiteID WHERE NumIDCaseta='"+req.params.IdCaseta+"' AND ITS.InvtID IN('PLO0001','PLO0002','PLO0003','PLE0001')   GROUP BY NumIDCaseta,Modulo,Caseta,Granja,Nombre,ITS.SiteID,ITS.InvtID,ITS.QtyAvail,ITS.AvgCost,IV.Descr,G.Proyecto ORDER BY Granja DESC ",
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
  
  router.get("/DetalleCarton/:idCaseta/:annio/:ciclo",  async function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      var idcaseta = req.param('idCaseta');
      var annio = req.param('annio');
      var ciclo = req.param('ciclo');  
  
      // query to the database and get the data
      request.query("SELECT  NumIDCaseta,Ano,Ciclo,Edad,LoteConsAlimGas,B.Crtd_Prog as PanSalida,B.Module as ModSalida,B.crtot as Totalsalida,B.status as StatusSalida,LoteAjusteMerma,B1.Crtd_Prog as PantAjuste,B1.Module as ModAjuste,B1.crtot as TotalAjuste,B1.status as StatusAjuste FROM nupecontcasdet left outer join batch B on B.batnbr=LoteConsAlimGas left outer join batch B1 on B1.batnbr=LoteAjusteMerma  WHERE NumIDCaseta='"+idcaseta+"' and Ano= '"+annio+"' and Ciclo= '"+ciclo+"' order by Edad",
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
  
  router.get("/DetalleSalida/:lote",  async function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      var lote = req.param('lote');
      // query to the database and get the data
      request.query("select Crtd_User,ProjectID,InvtID,Qty,UnitPrice,TranAmt,TranDesc,TranType,WhseLoc,User1,COGSSub,InvtSub,InvtAcct,ExtCost,ReasonCd,SiteID,Sub from  INTran where batNbr='"+lote+"' and TranType='II'",
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
  
  
  router.get("/transferencia/:lote/:trantype",  async function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      var lote = req.param('lote');
      var trantype = req.param('trantype');
      // query to the database and get the data
      request.query("select sum(Qty) as Cantidad,SUM(ExtCost) as Subtotal,ProjectID from INTran where BatNbr='"+lote+"' and TranType='"+trantype+"' group by ProjectID",
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
  
  
  
  router.get("/pedidos/:mes1/:annio", function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      // query to the database and get the data
      request.query(
   "select Articulo,I.Descr,sum(PesoPedido)as Peso,sum(TotFactura)as Total, Month(H.Crtd_DateTime) as Fecha,year(H.Crtd_DateTime) as Annio from NudcPedPolProHdr H (nolock) inner join nudcPedPolProDet D (nolock) on D.Pedido=H.Pedido inner join Inventory I on I.InvtID=D.Articulo where H.Status='F' and Month(H.Crtd_DateTime)='" +
          req.params.mes1 + "' and YEAR(H.Crtd_DateTime)='" +req.params.annio + "' group by Articulo,I.Descr,Month(H.Crtd_DateTime),year(H.Crtd_DateTime) order by Articulo ",
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
  
  router.get("/mortalidad/:anio",  async function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      var anio = req.param('anio');
    
      // query to the database and get the data
      request.query("select * from vw_mortalidad where annio='"+anio+"' order by number",
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
  
  router.get("/mortalidad_granjas/:anio",  async function(req, res) {
    // connect to your database
    sql.connect(config, function(err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      var anio = req.param('anio');
    
      // query to the database and get the data
      request.query("select * from vw_mortalidad_granja where annio='"+anio+"' order by number",
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
  
  
  router.get("/niveles_json/:anio", function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var data = [];
      var request = new sql.Request();
      var anio = req.param('anio');
  
      // query to the database and get the data
      request.query("select * from vw_json_mortalidad where annio='" + anio + "'",
        function (err, recordsets) {
          if (err) {
            console.log(err);
          } else {
            // res.writeHead(200, { "Content-type": "application/json" });
            //res.write(JSON.stringify(recordsets.recordset));
            res.json(recordsets.recordset);
  
          }
          res.end();
          sql.close();
        }
      ).then(
        // query to the database and get the data
        request.query("select * from vw_json_mortalidad where annio='" + anio + "'",
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              // res.writeHead(200, { "Content-type": "application/json" });
              //res.write(JSON.stringify(recordsets.recordset));
  
              res.json(result.recordset);
  
            }
            res.end();
            sql.close();
          }
        )
      );
    });
  });

  module.exports = router;