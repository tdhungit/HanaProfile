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
            "description"
        ];
    }
}

module.exports = new Skill();
