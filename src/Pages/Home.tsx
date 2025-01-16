import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookLayer from '../Components/BookLayer';

// TypeScript types for the book objects
interface Book {
  id: number;
  book_title: string;
  author: string;
  category: string;
  published_year: number;
  price: number;
  copies_in_stock: number;
}

interface BookInsert {
  book_title: string;
  author: string;
  category: string;
  published_year: number;
  price: number;
  copies_in_stock: number;
}

interface BookUpdate {
  book_title: string;
}

const BASE_URL =
  'https://01d11625-95c9-4950-aac4-0db881d6a8a1-dev.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0';

const Home: React.FC = () => {

  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<BookInsert>({
    book_title: '',
    author: '',
    category: '',
    published_year: 2021,
    price: 0,
    copies_in_stock: 0,
  });
  const [bookToUpdate, setBookToUpdate] = useState<{ id: string; book_title: string }>({ id: '', book_title: '' });
  const [bookToDelete, setBookToDelete] = useState<string>('');

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`${BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Create a new book
  const handleCreateBook = async () => {
    try {
      const response = await axios.post<number[]>(`${BASE_URL}/books`, [newBook]);
      setBooks([...books, { ...newBook, id: response.data[0] }]); // Assuming the response returns an array of IDs
      setNewBook({
        book_title: '',
        author: '',
        category: '',
        published_year: 2021,
        price: 0,
        copies_in_stock: 0,
      });
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  // Update a book
  const handleUpdateBook = async () => {
    try {
      const response = await axios.put<Book>(`${BASE_URL}/books/${bookToUpdate.id}`, {
        book_title: bookToUpdate.book_title,
      });
      const updatedBooks = books.map((book) =>
        book.id === response.data.id ? response.data : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Delete a book
  const handleDeleteBook = async () => {
    try {
      const response = await axios.delete<Book>(`${BASE_URL}/books/${bookToDelete}`);
      const updatedBooks = books.filter((book) => book.id !== response.data.id);
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="App">
      <BookLayer/>
      <h1>Bookstore</h1>

      <h2>Create a New Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={newBook.book_title}
        onChange={(e) => setNewBook({ ...newBook, book_title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newBook.category}
        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Published Year"
        value={newBook.published_year}
        onChange={(e) => setNewBook({ ...newBook, published_year: +e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newBook.price}
        onChange={(e) => setNewBook({ ...newBook, price: +e.target.value })}
      />
      <input
        type="number"
        placeholder="Copies in Stock"
        value={newBook.copies_in_stock}
        onChange={(e) => setNewBook({ ...newBook, copies_in_stock: +e.target.value })}
      />
      <button onClick={handleCreateBook}>Create Book</button>

      <h2>Update a Book</h2>
      <input
        type="number"
        placeholder="Book ID"
        value={bookToUpdate.id}
        onChange={(e) => setBookToUpdate({ ...bookToUpdate, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="New Book Title"
        value={bookToUpdate.book_title}
        onChange={(e) => setBookToUpdate({ ...bookToUpdate, book_title: e.target.value })}
      />
      <button onClick={handleUpdateBook}>Update Book</button>

      <h2>Delete a Book</h2>
      <input
        type="number"
        placeholder="Book ID"
        value={bookToDelete}
        onChange={(e) => setBookToDelete(e.target.value)}
      />
      <button onClick={handleDeleteBook}>Delete Book</button>

      <h2>All Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <p>Title: {book.book_title}</p>
            <p>Author: {book.author}</p>
            <p>Category: {book.category}</p>
            <p>Published Year: {book.published_year}</p>
            <p>Price: ${book.price}</p>
            <p>Copies in Stock: {book.copies_in_stock}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
