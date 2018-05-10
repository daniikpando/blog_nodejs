
const commander = require("commander");

var port = 3000 ,
    dbfile = "./config/db.json";

commander
    .version("1.0.0", "-v", "--version")
    .option("-p, --port <n>", "You can custom the server's port", parseInt)
    .option("-db, --database <dir>", "You can custom the server's file configuration", val => dbfile = val)
    .parse(process.argv)

if ( commander.port != undefined || commander.port != null) {
    port = commander.port; 
}

module.exports.port = port;
module.exports.dbfile = dbfile;