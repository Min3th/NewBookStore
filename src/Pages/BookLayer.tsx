import { useAuthContext } from '@asgardeo/auth-react';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import BookCard from '../Components/BookCard';
import BookForm from '../Components/BookForm';
import * as bookService from '../Components/BookService'
import { Book } from '../Components/types';

const REACT_APP_BASE_URL =
  'https://01d11625-95c9-4950-aac4-0db881d6a8a1-prod.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0';
const SECURITY_HEADER = 'YOUR_SECURITY_HEADER';



const BookLayer: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    book_title: '',
    author: '',
    category: '',
    published_year: new Date().getFullYear(),
    price: 0,
    copies_in_stock: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const { getAccessToken,signOut } = useAuthContext();

  const fetchBooks = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await bookService.getBooks(accessToken);
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    }
  };

  const handleCreateBook =useCallback(async () => {
    try {
      const accessToken = await getAccessToken();
      console.log(newBook);
      const response = await bookService.createBook(accessToken, newBook);
      setBooks([...books, { ...newBook, id: response.data[0] }]);
      setNewBook({
        id: 0,
        book_title: '',
        author: '',
        category: '',
        published_year: new Date().getFullYear(),
        price: 0.0,
        copies_in_stock: 0,
      });
    } catch (err) {
      setError('Failed to create a book. Please try again.');
      
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data || 'No response data');
        console.error('Status:', err.response?.status || 'No status code');
      } else {
        console.error('Unexpected error:', err);
      }
    };
  },[getAccessToken,newBook]) 
  const handleUpdateBook = useCallback(async (updatedBook: Book) => {
    try {
      const accessToken = await getAccessToken();
  
      // Destructure to remove `id` from the request body
      const { id, ...bookData } = updatedBook;
  
      await axios.put(`${REACT_APP_BASE_URL}/books/${id}`, bookData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Test-Key': SECURITY_HEADER,
        },
      });
  
      // Update the local state
      setBooks(
        books.map((book) =>
          book.id === updatedBook.id ? { ...book, ...updatedBook } : book
        )
      );
      console.log(`Book with ID ${updatedBook.id} updated successfully.`);
    } catch (err) {
      setError('Failed to update the book. Please try again.');
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data || 'No response data');
        console.error('Status:', err.response?.status || 'No status code');
      } else {
        console.error('Unexpected error:', err);
      }
    }
  },[[books]])
  

  const handleDeleteBook =useCallback(async (id: number) => {
    try {
      const accessToken = await getAccessToken();
      await axios.delete(`${REACT_APP_BASE_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Test-Key': SECURITY_HEADER,
        },
      });
      // Update state to remove the deleted book
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setError('Failed to delete the book. Please try again.');
      console.error('Error deleting book:', err);
    }
  },[books])

  const handleInputChange = (field: keyof Book, value: string | number) => {
    setNewBook({ ...newBook, [field]: value });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedHandleCreateBook = debounce(handleCreateBook, 500);

  

  return (
    <div className="w-screen min-h-screen bg-[#C4A484] flex flex-col items-center">
      <button className='text-[20px] absolute top-3 right-3 rounded-[10px] p-2 bg-red-500 m-2' onClick={ () => signOut() }>Logout</button>
      <h1 className="mt-10 text-[50px] m-5">BOOKS</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex flex-row items-center'>
        <BookForm
            book={newBook}
            onSubmit={debouncedHandleCreateBook}
            onInputChange={handleInputChange}
        />
        <div className="flex flex-row items-center justify-center gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />
          ))}
        </div>
        
      </div>
    </div>
      
  );
};

export default BookLayer;
