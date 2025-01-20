import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookLayer from './BookLayer';
import { useAuthContext } from "@asgardeo/auth-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';


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

 

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-[#C4A484]'>
      <div className='font-medium text-[30px]'>Welcome to the</div>
      
      <div className='font-semibold text-[100px] rounded-[10px] bg-[#7a5f51] shadow-lg p-4 tracking-[0.06em]'><FontAwesomeIcon icon={faBook} className='text-[90px] mr-3' />BOOKSTORE</div>

      <button className='text-[30px] absolute top-0 right-2 rounded-[10px] p-2 bg-[#8b6c5c] m-1' onClick={ () => signIn() }>Login</button>

      


     
       
      
    </div>
  );
};

export default Home;
