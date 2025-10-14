// CORE MODULES 
const path = require('path')
// import path from 'path'            CANT USE UNTIL THE FILE IS NAMED mjs OR PROJECT IS ESM TYPE

// LOCAL MODULES
const { homeRouter } = require('./routers/home');
const { secondNav } = require('./routers/seconNav');

//  EXTERNAL MODULES
const express = require('express');
const { staffRouter } = require('./routers/addStaff');
const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());

app.use(homeRouter);
app.use(secondNav);
app.use(staffRouter);

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));      CAN ALSO DO LIKE THIS

app.use("/", (req, res) => {
    res.status(404).send(`
        <h1> page not available </h1>
        `);
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`server running on address http://localhost:${PORT}`)
})