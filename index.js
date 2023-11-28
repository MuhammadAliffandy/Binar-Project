require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerUi= require('swagger-ui-express')
const swaggerJson = require('./openapi.json')
const routes = require("./src/routes/route");

const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,DELETE,PUT', 
    allowedHeaders: 'Content-Type,Authorization',
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use('/',routes);

app.get('/', async(req, res) => {
    res.status(200).json({ message: "Ping successfully" });
})

app.listen(5000, async () => {
    console.log('listening on http://localhost:5000');
});

module.exports = app;