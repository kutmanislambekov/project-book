import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuery,
  setItems,
  setLoading,
  setStartIndex,
  setTotalItems,
  setSelectedCategory,
  setSelectedSorting,
  fetchBooks,
} from './bookSlice';
import axios from 'axios';
import classes from './Book.module.css';
import srcImg from '../src/magnifying-glass-solid (2).svg';
import { Link } from 'react-router-dom';

const BookSearch = () => {
  const dispatch = useDispatch();
  const { query, items, loading, startIndex, totalItems, selectedCategory, selectedSorting } = useSelector(
    (state) => state.books
  );

  const clearQuery = () => {
    dispatch(setQuery(''));
  };

  const handleChange = (event) => {
    clearQuery();
    dispatch(setQuery(event.target.value));
  };

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  const handleSortingChange = (event) => {
    dispatch(setSelectedSorting(event.target.value));
  };

  const searchBooks = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await dispatch(fetchBooks({ query, startIndex }));
      const newItems = response.payload.items || [];
      dispatch(setItems(newItems));
      dispatch(setTotalItems(response.payload.totalItems || 0));
      dispatch(setStartIndex(startIndex + 30));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const searchMoreBooks = async () => {
    try {
      dispatch(setLoading(true));
      const response = await dispatch(fetchBooks({ query, startIndex }));
      const newItems = response.payload.items || [];
      dispatch(setItems([...items, ...newItems]));
      dispatch(setTotalItems(response.payload.totalItems || 0));
      dispatch(setStartIndex(startIndex + 30));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(fetchBooks({ query, startIndex }));
        const newItems = response.payload.items || [];
        dispatch(setItems(newItems));
        dispatch(setTotalItems(response.payload.totalItems || 0));
        dispatch(setStartIndex(startIndex + 30));
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchBooksByCategory();
  }, [selectedCategory]);
  console.log(items);

  return (
    <div>
      <div className={classes.header}>
        <br />
        <br />
        <h1>Search for books</h1>
        <br />
        <br />
        <form className={classes.inputWrap} onSubmit={searchBooks}>
          <input className={classes.minp} type="text" value={query} onChange={handleChange} />
          <button
            style={{
              width: '30px',
              height: '30px',
              transform: 'translate(-50px)',
              background: 'white',
              border: 'none',
              cursor: "pointer"
            }}
            className={classes.ssearch}
            disabled={loading}
          >
            <img style={{ width: 'px', height: '20px', transform: 'translateY(5px)' }} src={srcImg} alt="Search Icon" />
          </button>
        </form>
        <br />

        <div className={classes.selecct}>
          <h4>Catigories</h4>
          <select className={classes.selecct1} value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            <option value="art">Art</option>
            <option value="biography">Biography</option>
            <option value="computers">Computers</option>
            <option value="history">History</option>
            <option value="medical">Medical</option>
            <option value="poetry">Poetry</option>
          </select>
          <h4>Sorting by</h4>
          <select className={classes.selecct2} value={selectedSorting} onChange={handleSortingChange}>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      <p className={classes.p11}>Found {totalItems} books</p>

      <div className={classes.mmain}>
        {items.length > 0 ? (
          items.map((book) => (
            <div className={classes.bbok} key={book.id}>
              {/* Используйте Link правильно */}
              <Link to={`/books/${book.id}`}>
                <img
                  style={{ width: '150px', height: '200px', marginLeft: '50px', marginTop: '50px' }}
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : 'https://via.placeholder.com/150'
                  }
                  alt={book.volumeInfo.title}
                />
              </Link>
              <br />
              <br />
              <a style={{ color: 'rgb(142, 142, 142)' }} href="/">
                <br />
                {selectedCategory}
                <br />
                <br />
                {selectedSorting}
              </a>
              <br />
              <br />
              <h2 style={{ fontSize: '20px' }}>{book.volumeInfo.title}</h2>
              <br />
              <p style={{ color: 'rgb(142, 142, 142)', fontSize: '15px' }}>
                {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
              </p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
      {totalItems > startIndex && (
        <button className={classes.btnload} onClick={() => searchMoreBooks()} disabled={loading} style={{ marginTop: '10px' }}>
          load more
        </button>
      )}
    </div>
  );
};

export default BookSearch;
