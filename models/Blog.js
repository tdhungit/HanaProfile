const BaseModel = require('../core/BaseModel');

class Blog extends BaseModel {

    constructor() {
        super();
        this.table_name = 'blogs';
    }

    getFields() {
        return [
            "id",
            "name",
            "slug",
            "date_created",
            "date_publish",
            "summary",
            "content",
            "is_hot"
        ];
    }
}

module.exports = new Blog();
