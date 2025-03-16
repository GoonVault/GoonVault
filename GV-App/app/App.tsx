import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Welcome } from './routes/welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;