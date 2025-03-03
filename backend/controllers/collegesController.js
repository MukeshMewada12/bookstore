const CollegesModel = require('../models/collegesModel');

class CollegesController {
    // Get all colleges
    static async getAllColleges(req, res) {
        try {
            const colleges = await CollegesModel.getAllColleges();
            res.status(200).json({ success: true, data: colleges });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

  
}

module.exports = CollegesController;
