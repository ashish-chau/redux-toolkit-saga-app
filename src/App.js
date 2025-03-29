import React, { useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, Card } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import CartItems from "./components/CartItems";
import Login from "./components/Login";
import CheckoutPage from "./components/CheckoutPage";
import Carousel from "./components/Carousel";
import PaymentFailed from "./components/PaymentFailed";



function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const location = useLocation();

  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <>
      {!isCheckoutPage && <Header onSearch={setSearchQuery} />}
      <Box display="flex">
        {!isCheckoutPage && (
          <Sidebar onCategorySelect={(category) => setSelectedCategory(category || "All")} />
        )}
        <Box flexGrow={1} p={2}>
          <Routes>
            <Route path="/products" element={<Products searchQuery={searchQuery} selectedCategory={selectedCategory} />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/carousel" element={ <Carousel />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
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