const path = require('path');
const dbPath = path.resolve(__dirname, '../data/database.db');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath, (error) => {

    if (error) {
        return console.error(error.message);
    }

    console.log('Connected to the in-memory SQlite database.');
});

module.exports = db;
