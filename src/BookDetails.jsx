import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookDetails, setLoading, setSelectedBook } from './bookSlice';
import { useNavigate, useParams } from 'react-router-dom';

const BookDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { selectedBook, loading } = useSelector((state) => state.books);
  const onBack = () => navigate(-1);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(fetchBookDetails(bookId));
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getBookDetails();
  }, [dispatch, bookId]);

  return ( 
    <div>
      
      {loading ? (
        <p>Loading</p>
      ) : (
        selectedBook ? (
          <div >
            <h1>{selectedBook.volumeInfo.title}</h1>
            {selectedBook.volumeInfo.subtitle && <p>{selectedBook.volumeInfo.subtitle}</p>}
            <p>Author(s): {selectedBook.volumeInfo.authors && selectedBook.volumeInfo.authors.join(', ')}</p>
            <p>Published Date: {selectedBook.volumeInfo.publishedDate}</p>
            <p>Page Count: {selectedBook.volumeInfo.pageCount}</p>
            <p>Categories: {selectedBook.volumeInfo.categories && selectedBook.volumeInfo.categories.join(', ')}</p>
            <img src={selectedBook.volumeInfo.imageLinks.thumbnail} alt={selectedBook.volumeInfo.title} />
          </div>
        ) : (
          <p>Book details not available.</p>
          
        
        )
      )}  <button onClick={onBack}>back</button>
    </div>
  );
};

export default BookDetails;
