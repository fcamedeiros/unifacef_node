# Trabalho final da disciplina de node do Unifacef - Prof. Matheus

API Node JS para plataforma de vendas

## Requisitos

nodejs (https://nodejs.org/) v14.x LTS sqlite3

Ferramentas utilizadas neste projeto:
- Visual Studio Code
- Node.js: 14.16.1
- Ambiente Git configurado
- SQLite 3
- Postman
- SO: Ubuntu 20.04.2 LTS

## Modelo de Dados

![DiagramaProjeto](https://user-images.githubusercontent.com/35452578/116741656-c6e12b00-a9cc-11eb-8482-731577709ac2.png)

## Endpoints
1. Clientes:
- Recuperar todos os clientes: (GET) http://localhost:8080/clientes/
- Recuperar o cliente pelo e-mail: (GET) http://localhost:8080/clientes/:emailCliente
- Recuperar o cliente pelo id: (GET) http://localhost:8080/clientes/id/:idCliente
- Recuperar os pedidos de um cliente: (GET) http://localhost:8080/clientes/pedidos/:idCliente
- Inserir um cliente: (POST) http://localhost:8080/clientes
- Atualizar um cliente: (PUT) http://localhost:8080/clientes

2. Produtos:
- Recuperar todos os produtos: (GET) http://localhost:8080/produtos
- Recuperar um produto pela sua descrição/descrição aproximada: (GET) http://localhost:8080/produtos/descricao/:descricaoProduto
- Recuperar um produto pelo id: (GET) http://localhost:8080/produtos/id/:idProduto
- Inserir um produto: (POST) http://localhost:8080/produtos
- Atualizar um produto: (PUT) http://localhost:8080/produtos

3. Pedidos:
- Recuperar os pedidos: (GET) http://localhost:8080/pedidos/
- Recuperar os produtos de um pedido: (GET) http://localhost:8080/pedidos/produtos/:idPedido
- Gerar um pedido: (POST) http://localhost:8080/pedidos