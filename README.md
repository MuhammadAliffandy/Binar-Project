## API Service CraftIQ ( MOOC Website )
Okay , This is Backend Service Project API to created MOOC Website

## Build With
- [JavaScript](https://www.javascript.com/) - is a scripting language that enables you to create dynamically updating content, control multimedia, animate      images, and pretty much everything else.
- [Node JS](https://nodejs.org/en) - Node.js® is an open-source, cross-platform JavaScript runtime environment.
- [Express JS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Prisma](https://www.prisma.io/) - Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.
- [ESLint](https://eslint.org) - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.
- [Jest](https://jestjs.io) - Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase
- [NodeMailer](https://nodemailer.com/) - Nodemailer is a module for Node.js applications to allow easy as cake email sending.
- [JsonWebToken](https://jwt.io/) - is a compact URL-safe means of representing claims to be transferred between two parties.
- [Supertest](https://www.npmjs.com/package/supertest) - The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.
- [Railway](https://railway.app) - Railway is an infrastructure platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud.

## FYI 
- For this project we are used prisma and Express Js structure to combination build REST + MVC API sercvice
- First i set the configuration for eslint to be good structure in my program
- Dont forget to build structure to be good
- And then i testing my controller to unit testing and api to be integration testing for this
- I get the coverage to see the presentace for good or not , i launch my testing
- Deployment? yes i deploy my project in railway
- I use dbms from railway to public db and deploy my back end to be create easy used my rest Api.
  
## Getting Started

if you need to start api from your local and you want to change more algorithm from this, u can cloning first:

```sh
$ git clone https://github.com/MuhammadAliffandy/Binar-Project.git
```

## Usage

before you run this you must installation package to make the program its not error for u.

```sh
$ npm install
```
run the server with Node JS runtime and i am used Node JS v 18+

NB : Before you start the apps you should addded confguration to .env

```javascript

DATABASE_URL_TEST="DATABASE URL FOR TESTING"
DATABASE_URL="DATABASE URL FOR DEVELOPMENT "
ACCESS_TOKEN_SECRET="ACCESS TOKEN TO NODE MAILER CONFIG"
NODEMAILER_EMAIL="EMAIL ACCOUNT TO NODEMAILER"
NODEMAILER_PASSWORD="PASSWORD ACCOUNT TO NODEMAILER"

```
After this you can started the apps

```sh
$ npm run dev
```
To check the documentation of API you can access url form your web machine 

```javascript
http://localhost:5000/api-documentation
```

## Demo
Here is a working live demo  
https://binar-project-production.up.railway.app/

this is Documentation Swagger Api
https://binar-project-production.up.railway.app/api-documentation/



