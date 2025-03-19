import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { AppProvider } from "./AppProvider";
import { LayoutProvider } from "./LayoutProvider";

function App() {
  return (
    <AppProvider>
      <LayoutProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Router>
      </LayoutProvider>
    </AppProvider>
  );
}

export default App;
