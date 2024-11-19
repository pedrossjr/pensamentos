![Logo](https://github.com/pedrossjr/pensamentos/page.png)

# Sistema de publicação de pensamentos

Sistema de publicação de pensamentos feito em Nodejs com banco de dados PostgreSQL.

O sistema conta com autenticação para que cada usuário possa criar suas próprias publicações de pensamentos. Também é possível editar, excluir e pesquisar os pensamentos por palavras específicas.

## ⚙️ Instalação

- Faça o clone do projeto e configure o acesso do banco de dados no arquivo .env
- instale as depenências necessárias: npm install cryptjs connect-flash cookie-parser cookie-session dotenv express express-flash express-handlebars express-session nodemon pg pg-hstore sequelize session-file-store
- Antes de continuar, é necessário ter o banco de dados configurado com um usuário e senha.
- Após a instalação das depenências, inicie a aplicação com comando npm start

## 📚 Referências

- Nodejs - https://nodejs.org/docs/latest/api/
- Expressjs - https://expressjs.com/pt-br/5x/api.html
- Handlebarsjs - https://handlebarsjs.com/guide/
