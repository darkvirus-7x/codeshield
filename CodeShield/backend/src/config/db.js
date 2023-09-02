const mysql = require('mysql');

const conDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'codeshield'
});


conDB.connect((err) => {
    if (err) {
        console.error('Connection Error:', err);
    } else {
        console.log('Connection Success !');
    }
});

module.exports = {
    getConnection: () => conDB,
    query: (sql, values, callback) => conDB.query(sql, values, callback),
};
