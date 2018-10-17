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

    getBlog(limit = 0) {

        let sql = "SELECT * FROM " + this.table_name + " ORDER BY date_publish DESC";
        if (limit > 0) {
            sql += " LIMIT " + limit;
        }

        return this.all(sql);
    }
}

module.exports = new Blog();
