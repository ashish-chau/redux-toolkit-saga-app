import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, IconButton, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Remove, Add, Delete } from "@mui/icons-material";
import { addToCart, removeFromCart } from "../redux/utils/getBasicSlices";

function CartItems() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(removeFromCart(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ ...item, quantity: 0 })); // Remove item completely
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 12; // Example discount
  const subtotal = totalPrice - discount;

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      {/* Header Section with Continue Shopping Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Shopping Cart ({cartItems.length} items)
        </Typography>
        <Button variant="outlined" href="/products">
          ← Continue Shopping
        </Button>
      </Box>

      {/* Main Grid Layout */}
      <Grid container spacing={4}>
        {/* Left Side: Cart Items */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
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
                    <IconButton onClick={() => handleRemove(item)} sx={{ ml: 2 }}>
                      <Delete />
                    </IconButton>
                    <Typography variant="body2" sx={{ cursor: "pointer", color: "red", ml: 1 }}>
                      remove
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Right Side: Order Summary */}
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
            <Button variant="contained" sx={{ mt: 2, width: "100%" }}>
              Proceed to Pay
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartItems;
