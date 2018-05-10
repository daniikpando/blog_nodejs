'use strict';

/**
 * @version 1.0.0
 * @author Daniel Felipe Piñeros Calderón
 */

const express = require("express"),
    info = require("./utils/readCommand"),
    conn = require("./connections/db"),
    routesArticle = require("./routes/articleRoutes"),
    PORT = info.port,
    app = express();

app.use('/api/', routesArticle)

app.listen(PORT, err => {
    if(err) return console.log(`Ha ocurrido un error en el servidor: \n\t${err}`)
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
});
