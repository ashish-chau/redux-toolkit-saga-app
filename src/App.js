import React, { useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, Card } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import CartItems from "./components/CartItems";
import Login from "./components/Login";

const CheckoutPage = ({ cartItems, totalAmount }) => {
  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      {/* Cart Summary */}
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6">Pay</Typography>
          <Typography variant="h4" fontWeight="bold">${totalAmount.toFixed(2)}</Typography>
          {cartItems.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src={item.image} alt={item.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                <Box>
                  <Typography>{item.name}</Typography>
                  <Typography variant="body2">Qty {item.quantity}</Typography>
                </Box>
              </Box>
              <Typography fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
        </Card>
      </Grid>

      {/* Payment Form */}
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6">Pay with Card</Typography>
          <TextField fullWidth label="Email" type="email" margin="normal" />
          <TextField fullWidth label="Card Information" placeholder="1234 1234 1234 1234" margin="normal" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="MM / YY" placeholder="MM/YY" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="CVC" placeholder="CVC" />
            </Grid>
          </Grid>
          <TextField fullWidth label="Cardholder Name" margin="normal" />
          <Typography variant="body1" sx={{ mt: 2 }}>Billing Address</Typography>
          <Select fullWidth defaultValue="India">
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
          </Select>
          <TextField fullWidth label="Address Line 1" margin="normal" />
          <TextField fullWidth label="City" margin="normal" />
          <TextField fullWidth label="PIN" margin="normal" />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Pay
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  totalAmount: state.cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
});

const ConnectedCheckoutPage = connect(mapStateToProps)(CheckoutPage);

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
            <Route path="/checkout" element={<ConnectedCheckoutPage />} />
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