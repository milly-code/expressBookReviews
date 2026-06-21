const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Task 1 & Task 10: Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    // Using a Promise to simulate async retrieval of books
    const getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    const allBooks = await getBooks;
    res.send(JSON.stringify(allBooks, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error fetching books"});
  }
});

// Task 2 & Task 11: Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    // Using a Promise to simulate async retrieval
    const getByISBN = new Promise((resolve, reject) => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject("Book not found");
      }
    });
    const book = await getByISBN;
    res.send(JSON.stringify(book, null, 4));
  } catch (error) {
    res.status(404).json({message: "Book not found"});
  }
});

// Task 3 & Task 12: Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    // Using a Promise to simulate async retrieval
    const getByAuthor = new Promise((resolve, reject) => {
      const matchingBooks = [];
      const bookKeys = Object.keys(books);
      bookKeys.forEach((key) => {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
          matchingBooks.push(books[key]);
        }
      });
      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject("Author not found");
      }
    });
    const result = await getByAuthor;
    res.send(JSON.stringify(result, null, 4));
  } catch (error) {
    res.status(404).json({message: "Author not found"});
  }
});

// Task 4 & Task 13: Get all books based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    // Using a Promise to simulate async retrieval
    const getByTitle = new Promise((resolve, reject) => {
      const matchingBooks = [];
      const bookKeys = Object.keys(books);
      bookKeys.forEach((key) => {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
          matchingBooks.push(books[key]);
        }
      });
      if (matchingBooks.length > 0) {
        resolve(matchingBooks);
      } else {
        reject("Title not found");
      }
    });
    const result = await getByTitle;
    res.send(JSON.stringify(result, null, 4));
  } catch (error) {
    res.status(404).json({message: "Title not found"});
  }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
