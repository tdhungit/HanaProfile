const config = require('../config/config');
const appListStrings = require('../config/app_list_strings');

const _ = require('underscore');

class View {

    constructor(controller) {
        this.controller = controller;
        this.css = [];
        this.js = [];
    }

    setController(controller) {
        this.controller = controller;
    }

    setData(data) {

        data = data || {};

        const title = config.title || 'Hana Profile';
        if (data.title) {
            data.title += ' | ' + title
        } else {
            data.title = title;
        }

        data.base_url = config.base_url || '';
        data.admin_url = data.base_url + '/admin';

        data.static_url = data.base_url + '/static';
        data.file_url = data.base_url + '/files';

        data.cssCustom = this.css;
        data.jsCustom = this.js;

        data.appListStrings = appListStrings;

        return data;
    }

    setCss(css) {
        this.css = css;
    }

    setJs(js) {
        this.js = js;
    }

    render(template, res, data) {

        let path = template;

        if (this.controller) {
            path = this.controller + '/' + template;
        }

        return this.renderTpl(path, res, data)
    }

    renderTpl(template, res, data) {

        res.render(template, this.setData(data));
        return true;
    }
}

module.exports = View;
