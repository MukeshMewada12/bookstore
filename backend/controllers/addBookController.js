const AddBook = require('../models/addBookModel');
const path = require('path');

class AddBookController {
  static async createAddBook(req, res) {
    try {
      
        const data = req.body;
        const file = req.file; 


        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Add the file path to the data object
        data.bookPdf = file.path;

        const bookId = await AddBook.createAddBook(data);
        res.status(201).json({ message: 'Book added successfully', id: bookId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

  static async getAllAddBook(req, res) {
    try {
      const books = await AddBook.getAllAddBook();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateAddBook(req, res) {
    try {
      const data = req.body;
      const isUpdated = await AddBook.updateAddBook(data);
      res.status(200).json(books);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteAddBook(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await AddBook.deleteAddBook(id);
      if (!isDeleted) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getbookbyid(req, res) {
    try {
      const { id } = req.params;
      const book = await AddBook.getbookbyid(id); // Fetch book by ID

      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.status(200).json({ book });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = AddBookController;
