'use strict';

/**
 * @version 1.0.0
 * @author Daniel Felipe Piñeros Calderón
 */

const express = require("express"),
    jsonfile = require("jsonfile"),
    mongoose = require("mongoose"),
    info = require("./utils/readCommand"),
    PORT = info.port,
    DBFILE = info.dbfile,
    app = express();


jsonfile.readFile(DBFILE, (err, obj) => {
    if(err) {
        checkError(err);    
    }
    connectToBD(obj);
});

app.get("/", (req, res) => {
    res.status(200).send("Hola mundo");
});

app.listen(PORT, err => {
    if(err) return console.log(`Ha ocurrido un error en el servidor: \n\t${err}`)
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
});


function connectToBD(obj) {
    let stringConnection = `${obj.engine}://${obj.username}:${obj.password}@${obj.host}:${obj.port}/${obj.dbname}`

    mongoose.connect(stringConnection, {
            poolSize: obj.poolSize,
            reconnectTries: Number.MAX_VALUE
        },
        (err) => {
            if(err) checkError(err);
            console.log("Se ha conectado a la base de datos");
        }
    );
}

function checkError(err){ 
    console.log(`Ha ocurrido un error: ${err}`)
    process.exit(1); 
}