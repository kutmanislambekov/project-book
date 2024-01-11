import axios from "axios";

const instance = axios.create({ baseURL: 'https://www.googleapis.com/books/v1/volumes' });

const getBooks = (params) => instance.get('/', { params: { ...params, key: 'AIzaSyDslXGJJJ-DvHjJqyEGHvQ7jxFchthL7VA' } });

export const api = {
    getBooks
}