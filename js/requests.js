var mysql      = require('mysql');

function call_mysql(query) {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'sit'
    });
    
    connection.connect();
    
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
    });
    
    connection.end();
}