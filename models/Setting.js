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

    getSetting(name) {
        const data = {name: name};
        return this.getByData(data);
    }

    setSystemSettings() {
        const data = {category: 'system'};
        return this.getByData(data, true);
    }
}

module.exports = new Setting();
