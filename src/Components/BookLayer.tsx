import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
  const [books, setBooks] = useState<Book[]>([]);
  console.log('test-key:',SECURITY_HEADER);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(`${REACT_APP_BASE_URL}/books`, {
        headers: {
          Authorization: `Bearer ${SECURITY_HEADER}`,
          Accept: 'application/json',
        },
      });
      setBooks(response.data);
      console.log('Books fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="w-[200px] h-[100px] bg-lime-300">
      <h1>BookLayer</h1>
      <div className="text-blue-500">
        {books.map((book) => (
          <div key={book.id}>
            {book.book_title} by {book.author}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookLayer;
