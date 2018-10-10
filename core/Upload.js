const path = require('path');
const multer = require('multer');

class Upload {

    constructor(dir = 'files/') {
        this.setDir(dir);
        this.setFilter(function (req, file, callback) {
            //const ext = path.extname(file.originalname);
            callback(null, true);
        });
    }

    setDir(dir) {

        this.upload_dir = path.join(__dirname, '../' + dir);
        const self = this;

        this.storage = multer.diskStorage({

            destination: function (req, file, callback) {
                callback(null, self.upload_dir);
            },

            filename: function (req, file, callback) {

                const ext = path.extname(file.originalname);
                const name = file.fieldname + '_' + Date.now() + ext;

                callback(null, name);
            }
        });
    }

    setFilter(fileFilter) {
        this.fileFilter = fileFilter;
    }

    getUpload() {
        return multer({
            storage: this.storage,
            fileFilter: this.fileFilter
        });
    }
}

module.exports = Upload;
