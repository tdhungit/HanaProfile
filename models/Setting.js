const BaseModel = require('../core/BaseModel');

class Setting extends BaseModel {

    constructor() {
        super();
        this.table_name = 'settings';
    }

    getFields() {
        return [
            'id',
            'category',
            'name',
            'value'
        ];
    }
}
