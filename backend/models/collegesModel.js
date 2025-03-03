const db = require('../database');

class CollegesModel {
  static async getAllColleges() {
    try {
      const [rows] = await db.query('SELECT * FROM college_data');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching colleges: ${error.message}`);
    }
  }




}

module.exports = CollegesModel;
