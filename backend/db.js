const Database = require('better-sqlite3');

const db = new Database('./fra_atlas.db');

module.exports = db;
