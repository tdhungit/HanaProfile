const BaseModel = require('../core/BaseModel');

class Experience extends BaseModel {

    constructor() {
        super();
        this.table_name = 'experiences';
    }

    getFields() {
        return [
            "id",
            "name",
            "type",
            "workat",
            "workat_link",
            "workat_address",
            "date_start",
            "date_end",
            "description"
        ];
    }

    getExperiences(limit = 0) {

        let sql = "SELECT * FROM " + this.table_name + " ORDER BY date_start DESC";
        if (limit > 0) {
            sql += " LIMIT " + limit;
        }

        return this.all(sql);
    }
}

module.exports = new Experience();
