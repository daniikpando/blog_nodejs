const mongoose = require('mongoose'),
      jsonfile = require("jsonfile"),
      DBFILE = require("../utils/readCommand").dbfile;

var conn;

jsonfile.readFile(DBFILE, (err, obj) => {
    if(err) {
        checkError(err);    
    }
    connectToBD(obj);
});

function connectToBD(obj) {
    let stringConnection = `${obj.engine}://${obj.username}:${obj.password}@${obj.host}:${obj.port}/${obj.dbname}`

    mongoose.connect(stringConnection, {
            poolSize: obj.poolSize,
            reconnectTries: Number.MAX_VALUE
        },
        (err) => {
            if(err) checkError(err);

            conn = mongoose.connection;
            console.log("Se ha conectado a la base de datos");
        }
    );
}

function checkError(err){ 
    console.log(`Ha ocurrido un error: ${err}`)
    process.exit(1); 
}


module.exports;