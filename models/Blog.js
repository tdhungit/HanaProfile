const BaseModel = require('../core/BaseModel');

class Blog extends BaseModel {

    constructor() {
        super();
        this.table_name = 'blogs';
    }

    getFields() {
        return [
            "id",
            "image",
            "name",
            "slug",
            "category",
            "date_created",
            "date_publish",
            "summary",
            "content",
            "is_hot"
        ];
    }

    fixRecord(data) {
        try {
            data.category = JSON.parse(data.category);
        } catch (e) {}

        return data;
    }
}

module.exports = new Blog();
