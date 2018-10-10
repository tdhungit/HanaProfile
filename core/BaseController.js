const View = require('../core/View');

class BaseController {

    constructor() {
        this.view = new View(this.constructor.name.toLowerCase());
    }

    setCss(css) {
        this.view.setCss(css);
    }

    setJs(js) {
        this.view.setJs(js);
    }

    render(template, res, data) {
        this.view.render(template, res, data);
    }
}

module.exports = BaseController;
