const multer = require('multer');
const path = require('path');

// הגדרת איפה לשמור את הקבצים ואיך לקרוא להם
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // תיקיית שמירת הקבצים
    },
    filename: (req, file, cb) => {
        // שמירת הקובץ עם תוספת זמן למניעת התנגשויות ושמירת הסיומת
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;

