import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { AppProvider } from "./AppProvider";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
