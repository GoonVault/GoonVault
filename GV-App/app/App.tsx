import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;