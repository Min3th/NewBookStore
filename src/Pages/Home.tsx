import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookLayer from '../Components/BookLayer';
import { useAuthContext } from "@asgardeo/auth-react";


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


  const { state, signIn, signOut,getAccessToken,getDecodedIDToken } = useAuthContext();

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

  useEffect(()=>{
    getAccessToken().then((accessToken)=>{
      console.log(accessToken);
    }).catch((error)=>{console.log(error);}
    );
  },[]);

  getDecodedIDToken().then((decodedIDToken)=>{
    console.log(decodedIDToken);
  }).catch((error)=>{
    console.log(error);
  })

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  // Fetch all books
  // const fetchBooks = async () => {
  //   try {
  //     const response = await axios.get<Book[]>(`${BASE_URL}/books`);
  //     setBooks(response.data);
  //   } catch (error) {
  //     console.error('Error fetching books:', error);
  //   }
  // };

  // Create a new book
  

  // // Update a book
  // const handleUpdateBook = async () => {
  //   try {
  //     const response = await axios.put<Book>(`${BASE_URL}/books/${bookToUpdate.id}`, {
  //       book_title: bookToUpdate.book_title,
  //     });
  //     const updatedBooks = books.map((book) =>
  //       book.id === response.data.id ? response.data : book
  //     );
  //     setBooks(updatedBooks);
  //   } catch (error) {
  //     console.error('Error updating book:', error);
  //   }
  // };

  // // Delete a book
  // const handleDeleteBook = async () => {
  //   try {
  //     const response = await axios.delete<Book>(`${BASE_URL}/books/${bookToDelete}`);
  //     const updatedBooks = books.filter((book) => book.id !== response.data.id);
  //     setBooks(updatedBooks);
  //   } catch (error) {
  //     console.error('Error deleting book:', error);
  //   }
  // };

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-[#C4A484]'>
      <div className='font-medium text-[30px]'>Welcome to the</div>
      <div className='font-semibold text-[100px] rounded-[10px] bg-[#7a5f51] shadow-lg p-4 tracking-[0.06em]'>BOOKSTORE</div>

      <button className='text-[30px] rounded-[10px] p-2 bg-[#8b6c5c] m-2' onClick={ () => signIn() }>Login</button>

      


     
       
      
    </div>
  );
};

export default Home;
