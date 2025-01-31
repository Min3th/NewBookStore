import React, { useState } from 'react';
import mockingjay from '../Images/mockingjay.jpg'
import { Book } from './types';



interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;  // () indicates that its a function . =>void indicates that it doesnt return anything
  onUpdate: (updatedBook:Book) =>void;
}

const BookCard: React.FC<BookCardProps> = ({ book,onDelete,onUpdate}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(book);

  const handleSave = () => {
    onUpdate(editedBook);
    setIsEditing(false);
  };
  return (
    <div className=" p-4 rounded-md shadow-lg max-w-sm transform hover:scale-110 transition-transform duration-300 bg-[#7a5f51] flex flex-col items-center">
      <img 
        src={mockingjay}
        alt={book.book_title}
        className="w-[200px] h-[300px]  rounded-md mb-4"
      />
      
      
      {isEditing ? (
        <>
          <input
              className=''
              type="number"
              value={editedBook.id}
              onChange={e => setEditedBook({ ...editedBook, id: Number(e.target.value) })}
              placeholder="ID"
            />
          <input
            className="rounded-[2px] "
            type="text"
            value={editedBook.book_title}
            onChange={(e) =>
              setEditedBook({ ...editedBook, book_title: e.target.value })
            }
          />
          <input
            className="rounded-[2px] "
            type="text"
            value={editedBook.author}
            onChange={(e) =>
              setEditedBook({ ...editedBook, author: e.target.value })
            }
          />

          <input
            type="text"
            value={editedBook.category}
            onChange={e => setEditedBook({ ...editedBook, category: e.target.value })}
            placeholder="Category"
          />
          
          <input
            type="number"
            value={editedBook.copies_in_stock}
            onChange={e => setEditedBook({ ...editedBook, copies_in_stock: Number(e.target.value) })}
            placeholder="Number of Copies"
          />
          
          <input
            type="number"
            value={editedBook.price}
            onChange={e => setEditedBook({ ...editedBook, price: Number(e.target.value) })}
            placeholder="LKR"
          />
          
          <input
            type="number"
            value={editedBook.published_year}
            onChange={e => setEditedBook({ ...editedBook, published_year: Number(e.target.value) })}
            placeholder="Year"
          />
          
        </>
      ) : (
        
        <div className='text-left'>
          <h2 className="text-lg font-bold mb-2 text-white">{book.book_title}</h2>
          <p className="text-white mb-1 text-left">
            Author:{book.author}
          </p>
          <p className="text-white mb-1 text-left">
            Category: {book.category}
          </p>
          <p className="text-white mb-1">
            Published Year:{book.published_year}
          </p>
          <p className="text-white mb-1">
            Price: ${book.price.toFixed(2)}
          </p>
          <p className="text-white mb-1">
           Copies Available: {book.copies_in_stock}
          </p>

          
        </div>
          
      )}
      <div className='flex flex-row gap-4'>
      {isEditing ? (<button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
            Save
          </button>):(<button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white w-[62.91px] rounded"
            >
              Edit
            </button>
        )}
        <button
        onClick={() => onDelete(book.id)}
        className=" bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </div>
      
    </div>
  );
};

export default BookCard;
