import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import CartItems from "./components/CartItems";

function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation(); // ✅ Get current route

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <Box display="flex">
        {/* ✅ Hide Sidebar when on "/cart" */}
        {location.pathname !== "/cart" && (
          <Sidebar
            onCategorySelect={(category) =>
              setSelectedCategory(category || "All")
            }
          />
        )}
        <Box flexGrow={1} p={2}>
          <Routes>
            <Route
              path="/products"
              element={
                <Products
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                />
              }
            />
            <Route path="/cart" element={<CartItems />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
