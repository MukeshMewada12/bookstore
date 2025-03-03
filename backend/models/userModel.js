const db = require('../database'); 
const bcrypt = require('bcryptjs');

class RegistrationModel {
  
  static async isEmailUnique(email) {
    try {
      const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      return rows.length === 0;
    } catch (error) {
      throw new Error(`Error checking email uniqueness: ${error.message}`);
    }
  }

 
  static async createRegistration(data) {
    try {
      const { name, email, password } = data;
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        'INSERT INTO users (name, email, password,created_at) VALUES (?, ?, ?,NOW())',
        [name, email, hashedPassword]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating registration: ${error.message}`);
    }
  }

 
  static async findUserByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  
  static async getAllRegistrations() {
    try {
      const [rows] = await db.query('SELECT id, name, email FROM users');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all registrations: ${error.message}`);
    }
  }

  static async logOutUser(data) {
    try {
      const { id } = data;
 
      const [result] = await db.query(
        'update users set status=1 where id=?',
        [id]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Error logout: ${error.message}`);
    }
  }

  
  static async getRegistrationById(id) {
    try {
      const [rows] = await db.query('SELECT id, name, email FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching registration by ID: ${error.message}`);
    }
  }

 
  static async updateRegistration(id, data) {
    try {
      const { name, email, password } = data;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      const query = hashedPassword
        ? 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?'
        : 'UPDATE users SET name = ?, email = ? WHERE id = ?';
      const params = hashedPassword ? [name, email, hashedPassword, id] : [name, email, id];

      const [result] = await db.query(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating registration: ${error.message}`);
    }
  }

  
  static async deleteRegistration(id) {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting registration: ${error.message}`);
    }
  }
}

module.exports = RegistrationModel;
