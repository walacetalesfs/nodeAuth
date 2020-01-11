# NodeAuth

## Motivação:
  Projeto criado para auxiliar meus projetos principais, 
  visto que a maioria deles precisava de uma API REST com CRUD de usuários e outros objetos

## Como Executar:
  * Certifique-se que o node está devidamente instalado. Saiba mais em  [nodejs.org/en/download/](https://nodejs.org/en/download/)
  * Certifique-se que o mongodb está devidamente instalado. Saiba mais em  [docs.mongodb.com/manual/installation](https://docs.mongodb.com/manual/installation/)
  * Na raiz do projeto execute:
  `npm install` e logo em seguida` node src/index.js`
  
## Endpoints:

**Registrar** `POST` `application/json`
 
*  **URL:** `/auth/register` 
  
*  **Parâmetros:**<br>`{ "name": "example", "email": "example@example.com", "password": "examplepassword"}`

* **Responses:**
  + status: 200 <br>
    content: `{ token : '{{token}}' }`<br>
  + status: 400 <br>
    content: `{ error: 'email de usuário já existe' }`<br>
  + status: 400 <br>
    content: `{ error : 'falha ao registrar' }`


**Autenticar** `POST` `application/json`
 
*  **URL:** `/auth/authenticate` 
  
*  **Parâmetros:** <br>`{ "email": "example@example.com", "password": "examplepassword"}`

* **Responses:**
  + status: 200 <br>
    content: `{ token : '{{token}}' }`<br>
  + status: 400 <br>
    content: `{ error: 'usuário não encontrado' }`<br>
  + status: 400 <br>
    content: `{ error: 'senha inválida' }`<br>

**Esqueci a Senha** `POST` `application/json`
 
*  **URL:** `/auth/forgot_password` 
  
*  **Parâmetros:** <br>`{ "email": "example@example.com"}`

* **Responses:**
  + status: 200 <br>
  + status: 400 <br>
    content: `{ error: 'usuário não encontrado' }`<br>
  + status: 400 <br>
    content: `{ error: 'não foi possivel enviar o email de recuperação' }`<br>
  + status: 400 <br>
    content: `{ error: 'erro ao recuperar a senha' }`<br>

**Nova Senha** `POST` `application/json`
 
*  **URL:** `/auth/reset_password` 
  
*  **Parâmetros:** <br>`{ "password": "password123" }`

* **Responses:**
  + status: 200 <br>
  + status: 400 <br>
    content: `{ error: 'usuário não encontrado' }`<br>
  + status: 400 <br>
    content: `{ error: 'token inválido' }`<br>
  + status: 400 <br>
    content: `{ error: 'token expirado' }`<br>
  + status: 400 <br>
    content: `{ error: 'erro ao resetar a senha }`<br>