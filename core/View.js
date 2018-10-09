const config = require('../config/config');

class View {

    constructor(controller) {
        this.controller = controller;
    }

    setController(controller) {
        this.controller = controller;
    }

    setData(data) {

        data = data || {};

        if (data.title) {
            data.title += ' | ' + config.title
        } else {
            data.title = config.title;
        }

        data.base_url = config.base_url || '';

        data.static_url = data.base_url + '/static';
        data.file_url = data.base_url + '/files';

        return data;
    }

    render(template, res, data) {

        let path = template;

        if (this.controller) {
            path = this.controller + '/' + template;
        }

        res.render(path, this.setData(data));
    }
}

module.exports = View;
