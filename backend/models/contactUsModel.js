
const db = require('../database');
class ContactUsModel {
  static async createContactUs(data) {
    try {
      const { name, email,subject,message,mobile_number} = data;
      const [result] = await db.query(
        'INSERT INTO contact_us (name, email,subject,message,mobile_number,created_at) VALUES (?, ?, ?,?,?,NOW())',
        [name,email,subject,message,mobile_number]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating ContactUs: ${error.message}`);
    }
  }

  static async getAllContactUs() {
    try {
      const [rows] = await db.query('SELECT * FROM contact_us');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching ContactUs: ${error.message}`);
    }
  }

  static async updateContactUs(data) {
    try {
      const { name,email,subject,message,mobile_number,id } = data;
      const [result] = await db.query(
        'UPDATE contact_us SET name = ?, email = ?, subject = ?,message=?,mobile_number=? WHERE id = ?',
        [name, email,subject,message,mobile_number, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating ContactUs: ${error.message}`);
    }
  }

  
  static async deleteContactUs(id) {
    try {
      const [result] = await db.query('DELETE FROM contact_us WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting ContactUs: ${error.message}`);
    }
  }


}

module.exports = ContactUsModel;