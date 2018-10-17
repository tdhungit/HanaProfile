const BaseModel = require('../core/BaseModel');

class Skill extends BaseModel {

    constructor() {
        super();
        this.table_name = 'skills';
    }

    getFields() {
        return [
            "id",
            "name",
            "icon",
            "description",
            "weight"
        ];
    }

    getSkills(limit = 0) {

        let sql = "SELECT * FROM " + this.table_name + " ORDER BY weight ASC";
        if (limit > 0) {
            sql += " LIMIT " + limit;
        }

        return this.all(sql);
    }
}

module.exports = new Skill();
