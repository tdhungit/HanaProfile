const db = require('../config/database');
const Promise = require('bluebird');
var _ = require('underscore');

class BaseModel {

    constructor() {

        this.table_name = '';
        this.db = db;
    }

    getFields() {
        return ['id', 'date_created'];
    }

    query(sql, params = []) {

        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (error) {
                if (error) {
                    console.log('Error running sql ' + sql);
                    console.log(error);
                    reject(error);
                } else {
                    resolve({error: 0});
                }
            });
        });
    }

    insert(data) {

        const fields = this.getFields();

        let insert_fields = '';
        let insert_values = '';

        fields.forEach(function (field) {

            if (data[field]) {
                insert_fields += field + ',';
                insert_values += JSON.stringify(data[field]) + ',';
            }
        });

        if (insert_fields && insert_values) {

            insert_fields = insert_fields.substr(0, insert_fields.length - 1);
            insert_values = insert_values.substr(0, insert_values.length - 1);
        }

        const insert_sql = 'INSERT INTO ' + this.table_name + '(' + insert_fields + ') VALUES (' + insert_values + ');';

        return new Promise((resolve, reject) => {

            this.db.run(insert_sql, function (error) {

                if (error) {
                    console.log('Error insert ' + insert_sql);
                    console.log(error);
                    reject(error);
                } else {
                    resolve({id: this.lastID});
                }
            });
        });
    }

    update(data) {

    }

    get(sql, params = []) {

        return new Promise((resolve, reject) => {

            this.db.get(sql, params, function (error, result) {

                if (error) {
                    console.log('Error sql ' + sql);
                    console.log(error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    all(sql, params = []) {

        return new Promise((resolve, reject) => {

            this.db.all(sql, params, (error, records) => {

                if (error) {
                    console.log('Error running sql: ' + sql)
                    console.log(error);
                    reject(error)
                } else {
                    resolve(records)
                }
            });
        });
    }

    getById(id) {
        const sql = 'SELECT * FROM ' + this.table_name + ' WHERE id = ?';
        return this.get(sql, [id]);
    }

    getByData(data, all = false) {

        let sql = 'SELECT * FROM ' + this.table_name + ' WHERE 1';
        let params = [];

        _.each(data, (value, field) => {
            sql += ' AND ' + field + ' = ?';
            params.push(value);
        });

        if (all) {
            return this.all(sql, params);
        }

        return this.get(sql, params);
    }
}

module.exports = BaseModel;
