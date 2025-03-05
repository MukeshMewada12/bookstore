const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
const dir = "./uploads";
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Import controllers
const RegistrationController = require('../controllers/userController');
const ConcatUsController = require('../controllers/contactUsController');
const collegesController = require('../controllers/collegesController');
const AddBookController = require('../controllers/addBookController');

const router = express.Router();

// Registration routes
router.post('/registrations', RegistrationController.createRegistration);
router.get('/registrations', RegistrationController.getAllRegistrations);
router.get('/registrations/:id', RegistrationController.getRegistrationById);
router.put('/registrations/:id', RegistrationController.updateRegistration);
router.delete('/registrations/:id', RegistrationController.deleteRegistration);
router.post('/login', RegistrationController.login);
router.post('/logout', RegistrationController.logOutUser);

// Contact Us routes
router.post('/createContactUs', ConcatUsController.createContactUs);
router.get('/getAllContactUs', ConcatUsController.getAllContactUs);
router.patch('/updateContactUs', ConcatUsController.updateContactUs);
router.delete('/deleteContactUs/:id', ConcatUsController.deleteContactUs);

// Colleges routes
router.get('/getAllColleges', collegesController.getAllColleges);

// Add Book routes
router.post('/createaddbook', upload.single('bookPdf'), AddBookController.createAddBook); // Ensure field name matches frontend
router.get('/getalladdbook', AddBookController.getAllAddBook);
router.patch('/updateaddbook', AddBookController.updateAddBook);
router.delete('/deleteaddbook/:id', AddBookController.deleteAddBook);
router.get('/getbookbyid/:id', AddBookController.getbookbyid);

module.exports = router;