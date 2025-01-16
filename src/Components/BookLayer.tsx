import axios from 'axios';
import React, { useState, useEffect } from 'react';

const REACT_APP_BASE_URL =
  'https://01d11625-95c9-4950-aac4-0db881d6a8a1-dev.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0';
const SECURITY_HEADER =
  'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0ZDdmMDgyZC1lNDI2LTRlM2YtYTUwZS0xYjA3YWQyZWUzNmRAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJCb29rU3RvcmUgbmV3IC0gRW5kcG9pbnQgOTA5MCIsImNvbnRleHQiOiJcLzAxZDExNjI1LTk1YzktNDk1MC1hYWM0LTBkYjg4MWQ2YThhMVwvYm9va3N0b3JlXC9ib29rc3RvcmUtbmV3XC92MS4wIiwicHVibGlzaGVyIjoiY2hvcmVvX3Byb2RfYXBpbV9hZG1pbiIsInZlcnNpb24iOiJ2MS4wIiwic3Vic2NyaXB0aW9uVGllciI6bnVsbH1dLCJleHAiOjE3MzcwMjc0MjYsInRva2VuX3R5cGUiOiJJbnRlcm5hbEtleSIsImlhdCI6MTczNzAyNjgyNiwianRpIjoiZDNiZWU3M2EtYjBiZS00ZGRkLWJkMTYtNzY0ZmI3ZjAyZTAzIn0.HO_ApREgEKanUJepcfTajnHepCMYnmf2cOLKiZdVzQhShw_DrWSfg26YqbvSYseLwK10PthBCbVOIjpFV2pkzl6vHfuZfwT69BJxPjm-d_QxXc7tkKp9ycv-T82mlurDv3kiUsrVdkZIJBj6NjlHN9YK-rSQ-1DcuLIP-3E8m2gzixlJ7UqT4Vvxgz0snKis3cFYh1kysy4pggcqAkDDHbc_4hHvfK4b7xWtMS6WbCzT4eY8_yujNWBcAhuaqJRJeDZwy0_lvfDG8F56GvmlsCyX93EbbkqC0fqVrQ4oLiaOsWwkAwgNJQeuy6W4bkGH2vsmf2FdyndVbvMJvZEBV1tzbDmmHDLamQyCkN8i1nsDcV0Otn0qJsRTkIRdsy9gpoEMDLnkMWSTQJdHX90ESGSKYamQJRWIoaE9F5fhAnWIU7_Gg3E1Dvg2_okwQslzvZxK-yUhuVywQoX8tIyLM18obwtLovz838Del4cDVVO30Y_JyR4R9ZTpXCbEXpQdCs17dJVdf4ImVQeeHroIHcjt3VV0RXTv0JI5Mmex07DySs1qO-ArYSjub4esKAajhIIlWdR7Vst2HXnkGokrhOxfCIqCXG0JjJ8Gaq0uLTUU3QhYJQDsj3rLCPD7uU_1KD49Ekb8wMZTr3l5HqI_bECwUgiBGJEFAivQRaFuHtU';



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
  console.log({base_url :REACT_APP_BASE_URL})
  const fetchBooks = async () => {
    console.log("i am here")
    console.log('test-key',SECURITY_HEADER)
    try {
      const response = await axios.get<Book[]>(`${REACT_APP_BASE_URL}` ,{
        headers: {
          'Test-Key': SECURITY_HEADER,
          Accept: 'application/json',
        },});
      setBooks(response.data);
      console.log('response:',response)
      console.log("i am now")
      console.log(process.env.BASE_URL)
    } catch (error) {
      console.log("i am there")
      console.error( error);
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
