/* Maestro OS · protótipo · dados de exemplo compartilhados (coerentes entre módulos)
   Nomes do Teste Maestro + exemplos. Toda tela lê daqui; nada de dado solto inventado por tela. */
(function(){
const D=M.D={};
D.hoje='2026-10-02';
D.equipe=[
 {id:'u1',nome:'Allysson Moura',area:'Comercial',papel:'Dono'},{id:'u2',nome:'Bruno Lima',area:'Técnica',papel:'Técnico líder'},
 {id:'u3',nome:'Carla Souza',area:'Administrativo',papel:'Financeiro'},{id:'u4',nome:'Diego Rocha',area:'Projetos',papel:'Gestor de obras'},
 {id:'u5',nome:'Elisa Prado',area:'Experiência',papel:'Sucesso do cliente'},{id:'u6',nome:'Felipe Nunes',area:'Comercial',papel:'Consultor'}];
D.contatos=[
 {id:'c1',nome:'Helena Duarte',tipo:'PF',papel:'Cliente',email:'helena.duarte@email.com',tel:'(31) 99812-4410',cidade:'Belo Horizonte',fase:'Projetos',conjuge:'Rafael Duarte'},
 {id:'c2',nome:'Marcos Valente',tipo:'PF',papel:'Cliente',email:'marcos@valente.com.br',tel:'(31) 99701-2288',cidade:'Belo Horizonte',fase:'Técnica'},
 {id:'c3',nome:'Sérgio Bastos',tipo:'PF',papel:'Cliente',email:'sergio.bastos@email.com',tel:'(31) 98844-1020',cidade:'Nova Lima',fase:'Comercial'},
 {id:'c4',nome:'Caio Ferraz',tipo:'PF',papel:'Cliente',email:'caio@email.com',tel:'(31) 99120-7733',cidade:'Belo Horizonte',fase:'Comercial'},
 {id:'c5',nome:'Rodrigo Alencar',tipo:'PF',papel:'Cliente',email:'rodrigo.alencar@email.com',tel:'(31) 98655-3010',cidade:'Contagem',fase:'Comercial'},
 {id:'c6',nome:'Lívia Prates e Otávio Lemos',tipo:'PF',papel:'Cliente',email:'livia.prates@email.com',tel:'(31) 99433-9081',cidade:'Belo Horizonte',fase:'Experiência'},
 {id:'c7',nome:'Marta Albuquerque',tipo:'PF',papel:'Cliente',email:'marta@email.com',tel:'(31) 98701-5566',cidade:'Belo Horizonte',fase:'Comercial'},
 {id:'c8',nome:'Sushi Yoru Bar',tipo:'PJ',papel:'Cliente',email:'contato@sushiyoru.com.br',tel:'(31) 3222-1980',cidade:'Belo Horizonte',fase:'Lead',empresa:'Sushi Yoru Bar Ltda'},
 {id:'c9',nome:'Paula e Renato Lopes',tipo:'PF',papel:'Cliente',email:'paula.lopes@email.com',tel:'(31) 99812-0021',cidade:'Belo Horizonte',fase:'Comercial'},
 {id:'c10',nome:'Marina Costa Arquitetura',tipo:'PJ',papel:'Parceiro',parceiro:'Arquiteto(a)',email:'marina@mcarq.com.br',tel:'(31) 3295-4400',cidade:'Belo Horizonte',fase:'—',empresa:'MC Arquitetura'},
 {id:'c11',nome:'Paulo Henrique Engenharia',tipo:'PJ',papel:'Parceiro',parceiro:'Engenheiro(a)',email:'ph@phengenharia.com',tel:'(31) 3344-1200',cidade:'Nova Lima',fase:'—'},
 {id:'c12',nome:'Construtora Alameda',tipo:'PJ',papel:'Parceiro',parceiro:'Construtora',email:'obras@alameda.com.br',tel:'(31) 3021-7788',cidade:'Belo Horizonte',fase:'—'}];
D.etapasComerciais=['Lead','Qualificação','Visita técnica','Proposta','Negociação','Decisão'];
D.negocios=[
 {id:'n1',titulo:'Residência Duarte — Automação',cliente:'Helena Duarte',cid:'c1',etapa:5,valor:46320.99,status:'Ganho',origem:'Arquiteto',resp:'Allysson Moura',obra:'o1',prob:100},
 {id:'n2',titulo:'Casa Valente — Rede e áudio',cliente:'Marcos Valente',cid:'c2',etapa:5,valor:73471.08,status:'Ganho',origem:'Indicação Interna',resp:'Felipe Nunes',obra:'o2',prob:100},
 {id:'n3',titulo:'Automação residencial',cliente:'Sérgio Bastos',cid:'c3',etapa:4,valor:113587.66,status:'Aberto',origem:'Arquiteto',resp:'Allysson Moura',prob:70},
 {id:'n4',titulo:'Cinema e áudio',cliente:'Caio Ferraz',cid:'c4',etapa:3,valor:249281.84,status:'Aberto',origem:'Relacionamento Pessoal',resp:'Felipe Nunes',prob:40},
 {id:'n5',titulo:'Rede e segurança',cliente:'Rodrigo Alencar',cid:'c5',etapa:3,valor:88411.31,status:'Aberto',origem:'Engenheiro',resp:'Allysson Moura',prob:50},
 {id:'n6',titulo:'Iluminação',cliente:'Marta Albuquerque',cid:'c7',etapa:4,valor:29200,status:'Aberto',origem:'Designer de Interiores',resp:'Felipe Nunes',prob:60},
 {id:'n7',titulo:'Som ambiente',cliente:'Sushi Yoru Bar',cid:'c8',etapa:1,valor:35273.6,status:'Aberto',origem:'Indicação Interna',resp:'Felipe Nunes',prob:20},
 {id:'n8',titulo:'Automação · apartamento',cliente:'Paula e Renato Lopes',cid:'c9',etapa:2,valor:157368.44,status:'Aberto',origem:'Arquiteto',resp:'Allysson Moura',prob:30},
 {id:'n9',titulo:'Segunda fase · Upgrade Automação',cliente:'Lívia Prates e Otávio Lemos',cid:'c6',etapa:5,valor:387709.02,status:'Ganho',origem:'Relacionamento Pessoal',resp:'Allysson Moura',obra:'o3',prob:100},
 {id:'n10',titulo:'Casa de campo — Wi-Fi',cliente:'Rodrigo Alencar',cid:'c5',etapa:0,valor:18900,status:'Aberto',origem:'Indicação Interna',resp:'Felipe Nunes',prob:10},
 {id:'n11',titulo:'Escritório — Áudio',cliente:'Marina Costa Arquitetura',cid:'c10',etapa:5,valor:21400,status:'Perdido',origem:'Arquiteto',resp:'Felipe Nunes',prob:0}];
D.propostas=[
 {id:'p1',numero:'#1042',titulo:'Residência Duarte — Automação',cliente:'Helena Duarte',valor:46320.99,status:'Aceita'},
 {id:'p2',numero:'#1051',titulo:'Automação residencial',cliente:'Sérgio Bastos',valor:113587.66,status:'Vista'},
 {id:'p3',numero:'#1053',titulo:'Cinema e áudio',cliente:'Caio Ferraz',valor:249281.84,status:'Rascunho'},
 {id:'p4',numero:'#1049',titulo:'Rede e segurança',cliente:'Rodrigo Alencar',valor:88411.31,status:'Enviada'},
 {id:'p5',numero:'#1038',titulo:'Segunda fase · Upgrade Automação',cliente:'Lívia Prates e Otávio Lemos',valor:387709.02,status:'Aceita'}];
D.obras=[
 {id:'o1',nome:'Residência Duarte',cliente:'Helena Duarte',cidade:'Belo Horizonte',bairro:'Cidade Jardim',status:'Em andamento',etapa:'Instalação elétrica',pct:64,valor:46320.99,relatorios:12,fotos:86,gestor:'Diego Rocha',inicio:'04/08/2026',previsao:'30/11/2026'},
 {id:'o2',nome:'Casa Valente',cliente:'Marcos Valente',cidade:'Belo Horizonte',bairro:'Pampulha',status:'Em andamento',etapa:'Infra de rede',pct:38,valor:73471.08,relatorios:7,fotos:41,gestor:'Diego Rocha',inicio:'01/09/2026',previsao:'15/12/2026'},
 {id:'o3',nome:'Residência Prates Lemos',cliente:'Lívia Prates e Otávio Lemos',cidade:'Belo Horizonte',bairro:'Belvedere',status:'Planejamento',etapa:'Pré-projeto',pct:12,valor:387709.02,relatorios:2,fotos:9,gestor:'Diego Rocha',inicio:'28/09/2026',previsao:'20/03/2027'},
 {id:'o4',nome:'Residência Alameda',cliente:'Construtora Alameda',cidade:'Nova Lima',bairro:'Alphaville',status:'Pausada',etapa:'Compra de materiais',pct:22,valor:31800,relatorios:3,fotos:14,gestor:'Diego Rocha',inicio:'10/07/2026',previsao:'—'},
 {id:'o5',nome:'Apartamento Savassi',cliente:'Paula e Renato Lopes',cidade:'Belo Horizonte',bairro:'Savassi',status:'Concluída',etapa:'Entregue',pct:100,valor:58210,relatorios:18,fotos:132,gestor:'Diego Rocha',inicio:'02/03/2026',previsao:'30/06/2026'}];
D.fornecedores=[
 {id:'f1',nome:'Luminar Sul',razao:'Luminar Sul Iluminação Ltda',doc:'12.345.678/0001-90',tel:'(31) 3333-1020',email:'vendas@luminarsul.com.br',marcas:['Stella'],situacao:'Ativo'},
 {id:'f2',nome:'Sonos Brasil',razao:'Sonos Brasil Comércio Ltda',doc:'23.456.789/0001-01',tel:'(11) 4004-1122',email:'b2b@sonos.com.br',marcas:['Sonos'],situacao:'Ativo'},
 {id:'f3',nome:'Ubiquiti · Distribuidor',razao:'Redes MG Distribuição Ltda',doc:'34.567.890/0001-12',tel:'(31) 3512-0909',email:'pedidos@redesmg.com.br',marcas:['Ubiquiti','Furukawa'],situacao:'Ativo'},
 {id:'f4',nome:'Control4 Brasil',razao:'C4 Automação do Brasil Ltda',doc:'45.678.901/0001-23',tel:'(11) 3000-4400',email:'dealer@control4.com.br',marcas:['Control4'],situacao:'Ativo'},
 {id:'f5',nome:'Intelbras',razao:'Intelbras S.A.',doc:'82.901.000/0001-27',tel:'(48) 2106-0006',email:'canal@intelbras.com.br',marcas:['Intelbras'],situacao:'Ativo'},
 {id:'f6',nome:'Fornecedor Teste Escopo',razao:'Teste Escopo Comercial Ltda',doc:'56.789.012/0001-34',tel:'(31) 3000-0000',email:'teste@escopo.com',marcas:[],situacao:'Bloqueado'}];
D.notifs=[
 {aba:0,titulo:'Tarefa vence hoje',cliente:'Sérgio Bastos',msg:'Ligar para confirmar a apresentação da proposta.',ator:'Fluxos',quando:'há 20 min',icon:'atividades',go:'#/atividades'},
 {aba:0,titulo:'Nexo recebido',cliente:'Marcos Valente',msg:'Conferir lista de compras da infra de rede.',ator:'Diego Rocha',quando:'há 1 h',icon:'trocar',go:'#/nexos'},
 {aba:1,titulo:'Proposta vista',cliente:'Sérgio Bastos',msg:'Abriu a proposta #1051 pela 3ª vez.',ator:'Cliente',quando:'há 50 min',icon:'olho',go:'#/propostas'},
 {aba:1,titulo:'Mensagem no chat',cliente:'Helena Duarte',msg:'“Conseguem vir quinta pela manhã?”',ator:'Bruno Lima',quando:'há 2 h',icon:'chat',lida:true},
 {aba:0,titulo:'Pagamento aguardando aprovação',cliente:'',msg:'Compra de cabos CAT6 · R$ 4.210,50',ator:'Bruno Lima',quando:'ontem',icon:'financeiro',go:'#/financeiro'}];
D.byId=(lista,id)=>(D[lista]||[]).find(x=>x.id===id);
})();
