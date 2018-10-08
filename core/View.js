class View {

    constructor(controller) {
        this.controller = controller;
    }

    setController(controller) {
        this.controller = controller;
    }

    render(template, res, data) {

        let path = template;

        if (this.controller) {
            path = this.controller + '/' + template;
        }

        res.render(path, data);
    }
}

module.exports = View;
