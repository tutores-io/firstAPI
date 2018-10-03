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

server.get('/show/:nomeDisciplina', function (req, res, next) {
    
    // knex('cidade').then((dados)=>{
        
    //     res.send(dados);
    // });

    // knex.raw('select * from estado where idEstado > ?', 1).then((dados)=>{ 
    //     res.send(dados);
    // });

    // knex.raw('select * from estado where ?? > ?', ['idEstado',0]).then((dados)=>{ 
    //     res.send(dados);
    // });

    const { nomeDisciplina } = req.params;

    const consulta = 'select 	u.*, p.nomePerfil, m.nomeMateria, n.nomeNivel, d.nomeDisciplina, a.nomeArea,'+
                          ' b.nomeBairro, c.nomeCidade, e.nomeEstado, dds.nomeDiasSemana,'+
                          ' h.horarios, t.nomeTurno'+
                          ' from Usuarios u'+
                          ' join Perfil p on p.idPerfil = u.cdPerfil'+
                          ' join MateriaTutor mt on mt.cdUsuario = u.idUsuarios'+
                          ' join Materias m on m.idMaterias = mt.cdMateria'+
                          ' join Nivel n on n.idNivel = m.cdNivel'+
                          ' join Disciplinas d on d.idDisciplinas = m.cdDisciplina'+
                          ' join Area a on a.idArea = d.cdArea'+
                          ' join BairrosAtuacao ba on ba.cdUsuario = u.idUsuarios'+
                          ' join Bairros b on b.idBairros = ba.cdbairro'+
                          ' join Cidade c on c.idCidade = b.cdCidade'+
                          ' join Estado e on e.idEstado = c.cdEstado'+
                          ' join Agenda ag on ag.cdUsuario = u.idUsuarios'+
                          ' join DiasDaSemana dds on dds.idDiasDaSemana = ag.cdDiaDaSemana'+
                          ' join Horarios h on h.idHorarios = ag.cdHorario'+
                          ' join Turno t on t.idTurno = h.cdTurno';

    knex.raw(consulta + ' where ?? = ?', ['nomeDisciplina',nomeDisciplina]).then((dados)=>{ 
        res.send(dados[0]);
    });
    

    // knex.raw('call listarUsuarios()').then((dados)=>{ 
    //   res.send(dados);
    // });

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

  server.get('/salvar/:nome/:email/:valorHoraAula/:cpf/:cdDisciplina/:cdBairro/:cdDiaDaSemana/:telefone/:cdHorarios',
    function (req, res, next) {
    
    const { nome } = req.params;
    const { email } = req.params;
    const { valorHoraAula } = req.params;
    const { cpf } = req.params;
    const { cdDisciplina } = req.params;
    const { cdBairro } = req.params;
    const { cdDiaDaSemana } = req.params;
    const { telefone } = req.params;
    const { cdHorarios } = req.params;

    knex.raw('call criarUsuario(?,?,?,?,?,?,?,?,?)',
            [nome, email, valorHoraAula, cpf, cdDisciplina, cdBairro, cdDiaDaSemana, telefone, cdHorarios])
    .then((dados)=>{ 
        res.send(dados);
    });

    return next();
  });