const BaseModel = require('../core/BaseModel');

class Portfolio extends BaseModel {

    constructor() {
        super();
        this.table_name = 'portfolios';
    }

    getFields() {
        return [
            "id",
            "name",
            "image",
            "link",
            "source_link",
            "category",
            "times",
            "date_start",
            "date_end",
            "description"
        ];
    }

    fixRecord(data) {
        try {
            data.category = JSON.parse(data.category);
        } catch (e) {}

        return data;
    }
}

module.exports = new Portfolio();
