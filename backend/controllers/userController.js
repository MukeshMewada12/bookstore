const RegistrationModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 

class RegistrationController {

  static async createRegistration(req, res) {
    try {
      const { name, email, password } = req.body;

      
      const isUnique = await RegistrationModel.isEmailUnique(email);
      if (!isUnique) {
        return res.status(400).json({ error: 'Email already exists' });
      }

     
      const registrationId = await RegistrationModel.createRegistration({ name, email, password });
      res.status(201).json({ message: 'Registration created successfully', id: registrationId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async login(req, res) {
    try {
      const { email, password } = req.body;

     
      const user = await RegistrationModel.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Password does not match' });
      }

   
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getAllRegistrations(req, res) {
    try {
      const registrations = await RegistrationModel.getAllRegistrations();
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async getRegistrationById(req, res) {
    try {
      const { id } = req.params;
      const registration = await RegistrationModel.getRegistrationById(id);
      if (!registration) {
        return res.status(404).json({ message: 'Registration not found' });
      }
      res.status(200).json(registration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async updateRegistration(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const isUpdated = await RegistrationModel.updateRegistration(id, { name, email, password });
      if (!isUpdated) {
        return res.status(404).json({ message: 'Registration not found' });
      }

      res.status(200).json({ message: 'Registration updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }






  static async logOutUser(req, res) {
    try {
      const { id } = req.body;

      const LogoutId = await RegistrationModel.logOutUser({ id });
      res.status(201).json({ message: 'LogOut successfully', id: LogoutId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }







  // Delete a registration
  static async deleteRegistration(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await RegistrationModel.deleteRegistration(id);
      if (!isDeleted) {
        return res.status(404).json({ message: 'Registration not found' });
      }
      res.status(200).json({ message: 'Registration deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = RegistrationController;
