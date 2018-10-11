const fs = require('fs');
const path = require('path');

const View = require('../core/View');
const config = require('../config/config');

class BaseController {

    constructor() {
        this.theme = config.theme || 'hana';
        this.themePath = path.join(__dirname, '../themes/' + this.theme);

        this.view = new View(this.constructor.name.toLowerCase());
    }

    setCss(css) {
        this.view.setCss(css);
    }

    setJs(js) {
        this.view.setJs(js);
    }

    render(template, res, data, checkTpl = false) {

        if (checkTpl) {

            if (fs.existsSync(this.themePath + '/jade/' + this.constructor.name.toLowerCase() + '/' + template + '.jade')) {
                return this.view.render(template, res, data);
            } else if (fs.existsSync(this.themePath + '/jade/CRUD/' + template + '.jade')) {
                return this.view.renderTpl('CRUD/' + template, res, data);
            }

            res.send('TEMPLATE ERROR!');
            return true;
        }

        return this.view.render(template, res, data);
    }
}

module.exports = BaseController;
