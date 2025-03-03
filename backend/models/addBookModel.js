const db = require('../database');

class AddBook {
  static async createAddBook(data) {
    try {
      const {city, universityName, collegeName,courseName, pincode, state,bookYear,bookCondition,bookPdf } = data;
      const [result] = await db.query(
        'INSERT INTO add_book (city, universityName, collegeName,courseName, pincode, state,bookYear,bookCondition,bookPdf, created_at) VALUES (?, ?, ?, ?, ?,?,?,?,?, NOW())',
        [city, universityName, collegeName,courseName, pincode, state,bookYear,bookCondition,bookPdf]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating book: ${error.message}`);
    }
  }

  static async getAllAddBook() {
    try {
      const [rows] = await db.query('SELECT * FROM add_book');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching books: ${error.message}`);
    }
  }

  static async updateAddBook(data) {
    try {
      console.log(data);
      const { id, city, universityName, collegeName,courseName, pincode, state,bookYear,bookCondition,bookPdf } = data;
      const [result] = await db.query(
        'UPDATE add_book SET city = ?, universityName = ?, collegeName = ?, courseName = ?,pincode=?,state=?,bookYear=?,bookCondition=?,bookPdf=?,updated_at=NOW() WHERE id = ?',
        [city, universityName, collegeName,courseName, pincode, state,bookYear,bookCondition,bookPdf, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating book: ${error.message}`);
    }
  }

  static async deleteAddBook(id) {
    try {
      const [result] = await db.query('DELETE FROM add_book WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting book: ${error.message}`);
    }
  }
}

module.exports = AddBook;
