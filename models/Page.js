const BaseModel = require('../core/BaseModel');

class Page extends BaseModel {

    constructor() {
        super();
        this.table_name = 'pages';
    }

    getFields() {
        return [
            "id",
            "date_created",
            "name",
            "slug",
            "content",
            "meta_keyword",
            "meta_description"
        ];
    }
}

module.exports = new Page();
