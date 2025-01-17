import { useAuthContext } from '@asgardeo/auth-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const REACT_APP_BASE_URL =
  'https://01d11625-95c9-4950-aac4-0db881d6a8a1-prod.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0';
const SECURITY_HEADER =
  'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0ZDdmMDgyZC1lNDI2LTRlM2YtYTUwZS0xYjA3YWQyZWUzNmRAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6cHJvZHVjdGlvbiIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJCb29rU3RvcmUgbmV3IC0gRW5kcG9pbnQgOTA5MCIsImNvbnRleHQiOiJcLzAxZDExNjI1LTk1YzktNDk1MC1hYWM0LTBkYjg4MWQ2YThhMVwvYm9va3N0b3JlXC9ib29rc3RvcmUtbmV3XC92MS4wIiwicHVibGlzaGVyIjoiY2hvcmVvX3Byb2RfYXBpbV9hZG1pbiIsInZlcnNpb24iOiJ2MS4wIiwic3Vic2NyaXB0aW9uVGllciI6bnVsbH1dLCJleHAiOjE3MzcwODc2NDUsInRva2VuX3R5cGUiOiJJbnRlcm5hbEtleSIsImlhdCI6MTczNzA4NzA0NSwianRpIjoiMWY0YmUwYWEtZGFiZS00OTdjLWFkYWQtNGEwMzNjY2EwZDM5In0.AMbHVdgTeM67X9cTT1GZMnnuK1Gbgc9AyhFj1xNvTEMV6CXGxegGRMToHAbq-1PUDi19np1UqVTpEjSF3frIniZmHBCi9jJ92yzsXhkjpTxJ01XXiCICTcsITMrRFegf-pdmTCjUvsIrn0UtNirdubfHExoLK--FH6omNwIx2LUO82Wqt8JqHDfgLYDOAkyBxQeiJDw9ekqzvNOrIHeR_qymY_TTK-BNZIqXEMroBfI7TA0u_SUnMbaguO-y1dWICCigux5jWu7NJAfAdt-81c38LhODaITHetwtjF-3u2QjdXLb1LEMY7kQT-_IWOdB6tiEJfjgb1fmL4YYm2nBpV2sYOHNzzeqYdSys_VfSERUwZc_Cax1ju-vAlRY4eX36OV9akAYS5gskN6o_bIxX10UmUSPTZbtRn3c7Bpbjo6PBLMrYwA-pYjnm85JaK1_ZFSENy3WjEAkspvZfPJiRAMilma0G6NdZWrYuNXTPzHZPZwZCrmpxgt5L7XbdSsIN2nt9yDsZOxEWCCqlYk1cU4o5IvDzszqKD8Owa0aWCn_StAWG5YbXhoxkHsZ_h_jSCfvZNjuzrIGlC2zlAS9KHJlaLHgBxRpAw5Mfe944Ris_x6ZbnJaieQUV-MTahbp4DursviBOlHc1g_rb9hP3l1_dVdxul2ObxdgRckeltk';

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
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      book_title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      published_year: 1925,
      price: 10.99,
      copies_in_stock: 5,
    },
    {
      id: 2,
      book_title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      published_year: 1960,
      price: 7.99,
      copies_in_stock: 10,
    },
  ]);
  
  

  const {getAccessToken} = useAuthContext();

  const fetchBooks = async () => {
    try {
      const accessToken = await getAccessToken();
      console.log('access token:',accessToken);
      // const response = await axios.get<Book[]>('https://01d11625-95c9-4950-aac4-0db881d6a8a1-prod.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0/books', {
      //   headers: {
      //     "Content-Type": "application/json",
      //     'Test-Key': SECURITY_HEADER,

   
      //   }
      // });
      // console.log("hello hello")
      // console.log(response.data)

      // setBooks(response.data); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#C4A484] flex flex-col items-center">
      <h1 className='mt-10 text-[50px]'>BookLayer</h1>
      <div className="flex flex-row items-center justify-center gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book}/>
          
        ))}
      </div>
    </div>
  );
};

export default BookLayer;
