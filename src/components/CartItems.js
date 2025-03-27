import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material";
import { addToCart, removeFromCart } from "../redux/utils/getBasicSlices";
import { Link } from "react-router-dom";
import Login from "./Login";

function CartItems({ cartItems, addToCart, removeFromCart }) {
  const [openLogin, setOpenLogin] = useState(false);

  const handleIncrease = (item) => {
    addToCart(item);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      removeFromCart(item);
    }
  };

  const handleRemove = (item) => {
    removeFromCart({ id: item.id });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 12;
  const subtotal = totalPrice - discount;

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      {/* Header Section (Hide Continue Shopping if Cart is Empty) */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Shopping Cart ({cartItems.length} items)
          </Typography>
          <Button variant="outlined" href="/products">
            ← Continue Shopping
          </Button>
        </Box>
      )}

      {cartItems.length === 0 ? (
        // Empty Cart UI
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <img
            src="cart-empty.png" // Replace with the correct image path
            alt="Empty Cart"
            style={{ width: "300px", marginBottom: "20px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Your Cart is Empty
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Looks like you haven’t added anything to your cart yet.
          </Typography>
          <Button variant="contained" href="/products">
            Shop Now
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Left Side: Cart Items */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cartItems.map((item) => (
                <Card
                  key={`${item.id}-${item.quantity}`}
                  sx={{ display: "flex", alignItems: "center", padding: 2 }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Color: {item.color}
                    </Typography>
                    <Typography variant="body2">
                      Price: <b>${item.price}</b>
                    </Typography>
                    <Typography variant="body2" sx={{ color: "green" }}>
                      In Stock
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Typography>Qty:</Typography>
                      <IconButton onClick={() => handleDecrease(item)}>
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncrease(item)}>
                        <Add />
                      </IconButton>
                      <IconButton
                        onClick={() => handleRemove(item)}
                        sx={{ ml: 2 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Side: Order Summary (Only Show if Cart is Not Empty) */}
          {cartItems.length > 0 && (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: 3,
                  background: "#fff",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Order Summary
                </Typography>
                <Typography variant="body2">
                  Price: <b>${totalPrice}</b>
                </Typography>
                <Typography variant="body2" color="green">
                  Delivery: Free
                </Typography>
                <Typography variant="body2" color="red">
                  Discount: -${discount}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
                  Subtotal: ${subtotal}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2, width: "100%" }}
                  onClick={() => setOpenLogin(true)}
                >
                  Proceed to Pay
                </Button>
                <Login
                  open={openLogin}
                  handleClose={() => setOpenLogin(false)}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item)),
  removeFromCart: (item) => dispatch(removeFromCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
