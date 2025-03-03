
const ContactUsModel = require('../models/contactUsModel');
class ContactUsController {
  static async createContactUs(req, res) {
    try {
      const data = req.body;
      const ContactUsId = await ContactUsModel.createContactUs(data);
      res.status(201).json({ message: 'ContactUs created successfully', id: ContactUsId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getAllContactUs(req, res) {
    try {
      const ContactUs = await ContactUsModel.getAllContactUs();
      res.status(200).json(ContactUs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



  static async updateContactUs(req, res) {
    try {
        
      const  data= req.body;
      const isUpdated = await ContactUsModel.updateContactUs(data);
      if (!isUpdated) {
        return res.status(404).json({ message: 'ContactUs not found' });
      }
      res.status(200).json({ message: 'ContactUs updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async deleteContactUs(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await ContactUsModel.deleteContactUs(id);
      if (!isDeleted) {
        return res.status(404).json({ message: 'ContactUs not found' });
      }
      res.status(200).json({ message: 'ContactUs deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ContactUsController;