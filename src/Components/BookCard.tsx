import React from 'react';
import mockingjay from '../Images/mockingjay.jpg'

// Declare the interface for the component's props
interface Book {
  id: number;
  book_title: string;
  author: string;
  category: string;
  published_year: number;
  price: number;
  copies_in_stock: number;
  
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className=" p-4 rounded-md shadow-lg max-w-sm transform hover:scale-110 transition-transform duration-300 bg-[#622A0F] flex flex-col items-center">
      <img 
        src={mockingjay}
        alt={book.book_title}
        className="w-[200px] h-[300px]  rounded-md mb-4"
      />
      <h2 className="text-lg font-bold mb-2 text-white">{book.book_title}</h2>
      <p className="text-white mb-1">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="text-white mb-1">
        <strong>Category:</strong> {book.category}
      </p>
      <p className="text-white mb-1">
        <strong>Published Year:</strong> {book.published_year}
      </p>
      <p className="text-white mb-1">
        <strong>Price:</strong> ${book.price.toFixed(2)}
      </p>
      <p className="text-white mb-1">
        <strong>Copies Available:</strong> {book.copies_in_stock}
      </p>
    </div>
  );
};

export default BookCard;
