const BaseModel = require('../core/BaseModel');

class User extends BaseModel {

    constructor() {
        super();
        this.table_name = 'users';
    }

    getFields() {
        return [
            'id',
            'date_created',
            'username',
            'password',
            'is_admin'
        ];
    }

    getByUsername(username) {
        const sql = 'SELECT * FROM ' + this.table_name + ' WHERE username = ?';
        return this.get(sql, [username]);
    }
}

module.exports = new User();
