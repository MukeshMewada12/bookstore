
const express = require('express');
const multer = require("multer");
const path = require("path");

const app = express();


// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Add a unique suffix to the file name
    },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Ensure the 'uploads' folder exists
const fs = require("fs");
const dir = "./uploads";
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const RegistrationController = require('../controllers/userController');
const ConcatUsController = require('../controllers/contactUsController');
const collegesController=require('../controllers/collegesController');
const AddBookController=require('../controllers/addBookController');

const router = express.Router();


router.post('/registrations', RegistrationController.createRegistration);
router.get('/registrations', RegistrationController.getAllRegistrations);
router.get('/registrations/:id', RegistrationController.getRegistrationById);
router.put('/registrations/:id', RegistrationController.updateRegistration);
router.delete('/registrations/:id', RegistrationController.deleteRegistration);
router.post('/login', RegistrationController.login);
router.post('/logout', RegistrationController.logOutUser);


router.post('/createContactUs', ConcatUsController.createContactUs);
router.get('/getAllContactUs', ConcatUsController.getAllContactUs);
router.patch('/updateContactUs', ConcatUsController.updateContactUs);
router.delete('/deleteContactUs/:id', ConcatUsController.deleteContactUs);
router.get('/getAllColleges',collegesController.getAllColleges);

// router.post('/createaddbook', AddBookController.createAddBook);
router.post('/createaddbook', upload.single('bookPdf'), AddBookController.createAddBook);

router.get('/getalladdbook', AddBookController.getAllAddBook);
router.patch('/updateaddbook', AddBookController.updateAddBook);
router.delete('/deleteaddbook/:id', AddBookController.deleteAddBook);

module.exports = router;