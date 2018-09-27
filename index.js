const restify = require('restify');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'tutoresIO'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/', function (req, res, next) {
    
    // knex('cidade').then((dados)=>{
        
    //     res.send(dados);
    // });

    // knex.raw('select * from estado where idEstado > ?', 1).then((dados)=>{ 
    //     res.send(dados);
    // });

    // knex.raw('select * from estado where ?? > ?', ['idEstado',0]).then((dados)=>{ 
    //     res.send(dados);
    // });

    knex.raw('call listarUsuarios()').then((dados)=>{ 
      res.send(dados);
    });

    // knex.raw('call sp_v_estado(?,?)',['amazonas',1]).then((dados)=>{ 
    //     res.send(dados);
    // });

    // knex('estado').where({
    //     idEstado: '1'
    //   }).select('nomeEstado').then((dados)=>{
        
    //     res.send(dados[0].nomeEstado);
    // });

    // knex.select().from('estado').then((dados)=>{
        
    //         res.send(dados);
    //     });
    
    
    return next();
  });