const db = require('../config/database');
const Promise = require('bluebird');
const _ = require('underscore');

class BaseModel {

    constructor() {

        this.table_name = '';
        this.db = db;
    }

    getFields() {
        return ['id', 'date_created'];
    }

    query(sql, params = [], ret = {}) {

        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (error) {
                if (error) {
                    console.log('Error running sql ' + sql);
                    console.log(params);
                    console.log(error);
                    reject(error);
                } else {
                    ret.error = 0;
                    ret.id = ret.id || this.lastID;
                    resolve(ret);
                }
            });
        });
    }

    insert(data) {

        const fields = this.getFields();

        let insert_fields = '';
        let insert_values = '';
        let params = [];

        _.each(fields, (field) => {

            if (data[field]) {
                insert_fields += field + ',';
                insert_values += '?,';
                params.push(data[field]);
            }
        });

        if (insert_fields && insert_values) {

            insert_fields = insert_fields.substr(0, insert_fields.length - 1);
            insert_values = insert_values.substr(0, insert_values.length - 1);
        }

        const insert_sql = 'INSERT INTO ' + this.table_name + '(' + insert_fields + ') VALUES (' + insert_values + ');';

        return this.query(insert_sql, params);
    }

    update(id, data) {

        const fields = this.getFields();
        let update_fields = '';
        let params = [];

        _.each(fields, (field) => {

            if (data[field] && field !== 'id') {
                update_fields += ' ' + field + ' = ?,';
                params.push(data[field]);
            }
        });

        if (update_fields) {
            update_fields = update_fields.substr(0, update_fields.length - 1);
        }

        const sql = 'UPDATE ' + this.table_name + ' SET ' + update_fields + ' WHERE id = ?';
        params.push(id);

        return this.query(sql, params, {id: id});
    }

    save(data) {

        if (data.id) {
            return this.update(data.id, data);
        }

        return this.insert(data);
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
