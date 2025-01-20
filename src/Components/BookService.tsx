// bookService.ts
import axios from 'axios';
import { Book } from './types';
  

const BASE_URL = 'https://01d11625-95c9-4950-aac4-0db881d6a8a1-prod.e1-us-east-azure.choreoapis.dev/bookstore/bookstore-new/v1.0';
const getBooks = async (token: string) => axios.get(`${BASE_URL}/books`, { headers: { Authorization: `Bearer ${token}` } });
const createBook = async (token: string, book: Book) => axios.post(`${BASE_URL}/books`, book, { headers: { Authorization: `Bearer ${token}` } });
export { getBooks, createBook };
