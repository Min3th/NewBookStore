import axios from 'axios';
import React, { useState, useEffect } from 'react';

const REACT_APP_BASE_URL =
'https://01d11625-95c9-4950-aac4-0db881d6a8a1-dev.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0';

const SECURITY_HEADER = process.env.REACT_APP_SECURITY_HEADER;

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
  console.log(REACT_APP_BASE_URL)
  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`${REACT_APP_BASE_URL}/books` ,{
        headers: {
          'Authorization': `Bearer ${SECURITY_HEADER}`
        }});
      setBooks(response.data);
      console.log(process.env.BASE_URL)
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className='w-[200px] h-[100px] bg-lime-300'>
      BookLayer
      <div className='text-blue-500'>
        {books.map(book => (
          <div key={book.id}>
            {book.book_title} by {book.author}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookLayer;
