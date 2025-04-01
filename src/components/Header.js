import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Badge } from "@mui/material";
import { Search, ShoppingCart, Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Header({ onSearch }) {
    const cartItems = useSelector((state) => state.cart.cartItems || []); // ✅ Ensure it's an array
    console.log("cartItems", cartItems);

    return (
        <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: 3, padding: "5px 0" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Left Side - Logo */}
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", marginLeft: "200px" }}>
                    MyStore
                </Typography>

                {/* Middle - Search Box */}
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            background: "#f1f1f1",
                            borderRadius: "20px",
                            padding: "5px 10px",
                            width: "50%",
                        }}
                    >
                        <Search sx={{ color: "#555" }} />
                        <InputBase
                            placeholder="Search products..."
                            sx={{ marginLeft: "10px", flex: 1 }}
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </Box>
                </Box>

                {/* Right Side - Icons */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton>
                        <Notifications sx={{ color: "#333" }} />
                    </IconButton>

                    {/* ✅ Cart Icon with Badge */}
                    <Link to="/cart" >
                    <IconButton>
                        <Badge badgeContent={cartItems.length} color="error"> 
                            <ShoppingCart sx={{ color: "#333" }} />
                        </Badge>
                    </IconButton>
                    </Link>

                    <IconButton >
                        <AccountCircle sx={{ color: "#333" }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
