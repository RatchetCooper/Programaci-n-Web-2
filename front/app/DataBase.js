var mysql = require("mysql");
var conexion = mysql.createConnection({

    host:'localhost',
    database:'prueba',
    user:'root',
    password:'Nikkox34'
});
conexion.connect(function(err){
if(err)
{
    console.log('Error de conexion: ' + err.stack);
    return;
}
console.log('se conecto al id?' + conexion.threadId);
});
conexion.query('Select * from usuario', function (error, resultado, field){
    if(error)
    throw error;
resultado.forEach(resultado => {
console.log(resultado);
});
});

module.exports = conexion;