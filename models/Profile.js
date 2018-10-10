const BaseModel = require('../core/BaseModel');

class Profile extends BaseModel {

    constructor() {
        super();
        this.table_name = 'profile';
    }

    getFields() {
        return [
            "id",
            "name",
            "full_name",
            "avatar",
            "cover",
            "phone",
            "phone_alt",
            "email",
            "email_alt",
            "title",
            "social",
            "summary",
            "description",
            "foot_message",
            "address"
        ];
    }
}

module.exports = new Profile();
