import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // ✅ Default to "All"

  return (
    <Router>
      <Header onSearch={setSearchQuery} /> {/* ✅ Pass search function */}
      <Box display="flex">
        <Sidebar onCategorySelect={(category) => setSelectedCategory(category || "All")} />
        <Box flexGrow={1} p={2}>
          <Routes>
            <Route
              path="/products"
              element={<Products searchQuery={searchQuery} selectedCategory={selectedCategory} />}
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
