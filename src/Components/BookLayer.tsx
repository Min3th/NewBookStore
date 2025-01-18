import { useAuthContext } from '@asgardeo/auth-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const REACT_APP_BASE_URL =
  'https://01d11625-95c9-4950-aac4-0db881d6a8a1-prod.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0';
const SECURITY_HEADER = 'YOUR_SECURITY_HEADER';

interface Book {
  id: number;
  book_title: string;
  author: string;
  category: string;
  published_year: number;
  price: number;
  copies_in_stock: number;
}

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

  const { getAccessToken } = useAuthContext();

  const fetchBooks = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get<Book[]>(`${REACT_APP_BASE_URL}/books`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Test-Key': SECURITY_HEADER,
        },
      });
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Error fetching books:', err);
    }
  };

  const handleCreateBook = async () => {
    try {
      const accessToken = await getAccessToken();
      console.log(newBook);
      const response = await axios.post<number[]>(
        `${REACT_APP_BASE_URL}/books`,
        newBook,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Test-Key': SECURITY_HEADER,
          },
        }
      );
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
}

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#C4A484] flex flex-col items-center">
      <h1 className="mt-10 text-[50px] m-5">BOOKS</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-row items-center justify-center gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateBook();
        }}
        className="flex flex-col gap-4 p-4 bg-[#8b6c5c] rounded shadow-md m-8"
      >
        <input
          className='rounded-[2px] text-center'
          type="number"
          placeholder="ID"
          value={newBook.id}
          onChange={(e) =>
            setNewBook({ ...newBook, id:Number(e.target.value) })
          }        
        />
        <input
          className='rounded-[2px] text-center'
          type="text"
          placeholder="Book Title"
          value={newBook.book_title}
          onChange={(e) =>
            setNewBook({ ...newBook, book_title: e.target.value })
          }        
        />
        <input
          className='rounded-[2px] text-center'
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          className='rounded-[2px] text-center'
          type="text"
          placeholder="Category"
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
        />
        <input
          className='rounded-[2px] text-center'
          type="number"
          placeholder="Published Year"
          value={newBook.published_year}
          onChange={(e) =>
            setNewBook({ ...newBook, published_year: Number(e.target.value) })
          }
        />
        <input
          className='rounded-[2px] text-center'
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
        />
        <input
          className='rounded-[2px] text-center'
          type="number"
          placeholder="Copies in Stock"
          value={newBook.copies_in_stock}
          onChange={(e) =>
            setNewBook({ ...newBook, copies_in_stock: Number(e.target.value) })
          }
        />
        <button type="submit" className="bg-[#7a5f51] shadow-lg text-white py-2 px-4 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default BookLayer;
