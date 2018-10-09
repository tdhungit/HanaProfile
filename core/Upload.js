const path = require('path');
const multer = require('multer');

class Upload {

    constructor(dir = 'files/') {
        this.setDir(dir);
    }

    setDir(dir) {
        const dirPath = path.join(__dirname, '../' + dir);

        this.upload_dir = dirPath;
        this.upload = multer({dest: this.upload_dir});
    }

    getUpload() {
        return this.upload;
    }
}

module.exports = Upload;
