import React from 'react';

interface Book {
  id: number;
  book_title: string;
  author: string;
  category: string;
  published_year: number;
  price: number;
  copies_in_stock: number;
}

interface BookFormProps {
  book: Book;
  onSubmit: () => void;
  onInputChange: (field: keyof Book, value: string | number) => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onInputChange }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-4 p-4 bg-[#8b6c5c] rounded shadow-md m-8"
    >
      <input
        className="rounded-[2px] text-center"
        type="number"
        placeholder="ID"
        value={book.id}
        onChange={(e) => onInputChange('id', Number(e.target.value))}
      />
      <input
        className="rounded-[2px] text-center"
        type="text"
        placeholder="Book Title"
        value={book.book_title}
        onChange={(e) => onInputChange('book_title', e.target.value)}
      />
      <input
        className="rounded-[2px] text-center"
        type="text"
        placeholder="Author"
        value={book.author}
        onChange={(e) => onInputChange('author', e.target.value)}
      />
      <input
        className="rounded-[2px] text-center"
        type="text"
        placeholder="Category"
        value={book.category}
        onChange={(e) => onInputChange('category', e.target.value)}
      />
      <input
        className="rounded-[2px] text-center"
        type="number"
        placeholder="Published Year"
        value={book.published_year}
        onChange={(e) => onInputChange('published_year', Number(e.target.value))}
      />
      <input
        className="rounded-[2px] text-center"
        type="number"
        placeholder="Price"
        value={book.price}
        onChange={(e) => onInputChange('price', Number(e.target.value))}
      />
      <input
        className="rounded-[2px] text-center"
        type="number"
        placeholder="Copies in Stock"
        value={book.copies_in_stock}
        onChange={(e) => onInputChange('copies_in_stock', Number(e.target.value))}
      />
      <button type="submit" className="bg-[#7a5f51] shadow-lg text-white py-2 px-4 rounded">
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
