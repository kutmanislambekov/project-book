import React from 'react';
import BookSearch from './BookSearch';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookDetails from './BookDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/books" element={<BookSearch />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
