const BaseModel = require('../core/BaseModel');

class Profile extends BaseModel {

    constructor() {
        super();
        this.table_name = 'profile';
    }
}
