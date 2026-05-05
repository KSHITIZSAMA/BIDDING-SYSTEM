const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Avi1234567&',   
    database: 'rfq_system'
});

// test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('DB Connection Failed:', err.message);
    } else {
        console.log('DB Connected Successfully');
        connection.release();
    }
});

module.exports = pool.promise();