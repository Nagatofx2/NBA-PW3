const express = require('express');

/*CONFIGURAÇÃO DAS ROTAS DE CATEGORIA*/
const router = express.Router();

/* IMPORT DA MODEL DE CATEGORIA */
const modelCategoria = require('../model/CategoriaModel');

/* PARAMETROS DE ROTAS (QUALQUER VERBO):
1 - NOME DA ROTA - REPRESENTADO POR UMA STRING
2 - CALLBACK QUE TRATA REQUISIÇÃO (req) E RESPOSTA (res)
*/
/*ROTAS DE CRUD DE CATEGORIAS:*/
router.get('/listarNoticia', (req, res)=>{

    // console.log('TESTE DE ROTA GET DE CATEGORIAS');
    // console.log('----A REQUISIÇÃO GET PASSOU PELA CATEGORIA CONTROLLER----');
    // res.send('----TESTE DE ROTA GET DE CATEGORIAS----');

    //LISTANDO OS DADOS SEM CRITÉRIOS
    modelCategoria.findAll()
        .then(
            (noticias)=>{  
                return res.status(200).json(noticias);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados da Notícia',
                    erroBancoDados: erro
                });
            }
        );

});

//LISTANDO OS DADOS COM CRITÉRIOS
router.get('/listarNoticia/:id',(req, res)=>{

    let {id} = req.params;

    modelCategoria.findByPk(id)
        .then(
            (noticia)=>{
                res.status(200).json(noticia);
            }
        ).catch(
            (erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMessagem: 'Houve um erro ao selecionar os dados da Notícia',
                    erroBancoDados: erro
                });
            }
        );

});

router.post('/inserirNoticia', (req, res)=>{
    // console.log('A REQUISIÇÃO POST PASSOU PELA CATEGORIA CONTROLLER');
    // res.send('TESTE DE ROTA POST DE CATEGORIAS');

    //RECEBER OS DADOS
    // console.log(req.body.nome_categoria);
    // let nome_categoria = req.body.nome_categoria;
    let {nome_noticia} = req.body;
    // console.log(nome_categoria);
    
    //GRAVAR OS DADOS
    modelCategoria.create(
        {nome_noticia}
    ).then(
        ()=>{
                return res.status(201).json({
                    erroStatus: false,
                    menssagemStatus: 'Notícia inserida com sucesso!'
            });
        }
    ).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao subir a notícia',
                        erroBancoDados: erro
                    });
        }
    );

});

router.put('/alterarNoticia', (req, res)=>{

    // console.log('A REQUISIÇÃO PUT PASSOU PELA CATEGORIA CONTROLLER');
    // res.send('TESTE DE ROTA PUT DE CATEGORIAS');

    //RECEBENDO OS DADOS:
    let {id, nome_Noticia} = req.body;

    //ALTERANDO OS DADOS:
    modelCategoria.update(
        {nome_Noticia},
        {where:{id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Noticia alterada com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao alterar a Noticia',
                        erroBancoDados: erro
                    });
        }
    );

});

router.delete('/excluirNoticia/:id', (req, res)=>{

    // console.log('A REQUISIÇÃO DELETE PASSOU PELA CATEGORIA CONTROLLER');
    // res.send('TESTE DE ROTA DELETE DE CATEGORIAS');

    let {id} = req.params;

    modelCategoria.destroy(
        {where: {id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Noticia excluida com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao excluir a Noticia',
                        erroBancoDados: erro
                    });
        }
    );

});

module.exports = router;