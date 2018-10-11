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
            "date_start",
            "date_end",
            "description"
        ];
    }
}

module.exports = new Experience();
