import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import BookSearch from './BookSearch';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import BookDetails from './BookDetails';

ReactDOM.render(
   <Provider store={store}>
       <Router>
          <Routes>
            <Route path='/'element={<BookSearch />} />
            <Route path='/books/:id' element={<BookDetails />} />
          </Routes>  
        </Router> 
   </Provider>
 ,
  document.getElementById('root')
);