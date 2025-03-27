import { connect } from "react-redux";
import { getPost } from "../redux/action/action";
import { addToCart, removeFromCart } from "../redux/utils/getBasicSlices";
import { useEffect, useState } from "react";
import "../../src/styles/products.css";

import {
  Container,
  Typography,
  Modal,
  Box,
  Button,
  IconButton,
  Pagination,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Products({
  products,
  getPost,
  searchQuery,
  selectedCategory,
  addToCart,
  removeFromCart,
}) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loader state

  const productsPerPage = 6; // Display 6 products per page

  useEffect(() => {
    setLoading(true); // ✅ Show loader before fetching

    getPost();
  }, [getPost]);

  useEffect(() => {
    if (products?.isSuccess) {
      setLoading(false); // ✅ Hide loader when API response is successful
    }
  }, [products]);

  useEffect(() => {
    if (products?.data?.products) {
      let filtered = products.data.products;

      if (selectedCategory !== "All") {
        filtered = filtered.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      if (searchQuery.trim() !== "") {
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
      setPage(1); // Reset to first page when filters change
    }
  }, [products, searchQuery, selectedCategory]);

  // Handle Pagination Change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Get products for current page
  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  // ✅ Handle Add to Cart and Show Snackbar
  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Product List
      </Typography>

      {/* ✅ Loader Handling */}
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <>
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenModal(product)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                margin: "15px",
                textAlign: "center",
                width: "220px",
                display: "inline-block",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "white",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    margin: "8px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px", // Spacing between price and discount
                    margin: "5px 0",
                  }}
                >
                  {/* Price Section */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "rgb(34 197 94)",
                        fontWeight: "600",
                        fontSize: "1.75rem",
                      }}
                    >
                      $
                    </span>
                    <span
                      style={{
                        color: "black",
                        fontWeight: "600",
                        fontSize: "1.75rem",
                        marginLeft: "2px",
                      }}
                    >
                      {product.price}
                    </span>
                  </p>

                  {/* Discount Section */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span
                      style={{
                        borderRadius: "50%",
                        border: "1px solid red",
                        background: "red",
                        color: "white",
                        fontSize: "11px",
                        width: "24px", // Adjust for a better circular look
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {product.discount}%
                    </span>
                    <span
                      style={{
                        color: "black",
                        fontWeight: "500",
                        fontSize: ".875rem",
                      }}
                    >
                      off
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ✅ Pagination */}
      {selectedCategory === "All" && (
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        />
      )}

      {/* ✅ Custom Styled Modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="product-details-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "1000px",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          {/* ✅ Left Side - Product Image */}
          <Box sx={{ width: "40%", padding: 2, marginTop: "30px" }}>
            <img
              src={selectedProduct?.image}
              alt={selectedProduct?.title}
              width="100%"
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          </Box>

          {/* ✅ Right Side - Product Details */}
          <Box sx={{ width: "60%", padding: 3, position: "relative" }}>
            {/* ✅ Close Button */}
            <IconButton
              sx={{ position: "absolute", top: 10, right: 10 }}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>

            {/* ✅ Product Title */}
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {selectedProduct?.title}
            </Typography>

            {/* ✅ Price with Discount */}
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "green" }}
            >
              ${selectedProduct?.price}{" "}
              <span style={{ color: "red", fontSize: "14px" }}>
                {selectedProduct?.discount}% off
              </span>
            </Typography>

            {/* ✅ Brand, Model, Color */}
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>Brand:</b> {selectedProduct?.brand}
            </Typography>
            <Typography variant="body1">
              <b>Model:</b> {selectedProduct?.model}
            </Typography>
            <Typography variant="body1">
              <b>Color:</b> {selectedProduct?.color}
            </Typography>

            {/* ✅ Description */}
            <Typography variant="body1" sx={{ marginTop: "10px" }}>
              About this product:
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
              {selectedProduct?.description
                ? selectedProduct.description.length > 300
                  ? `${selectedProduct.description.slice(0, 300)}...`
                  : selectedProduct.description
                : "No description available"}
            </Typography>

            {/* ✅ Add to Cart Button */}
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{ mt: 3, width: "100%" }}
              onClick={() => handleAddToCart(selectedProduct)}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* ✅ Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Product added to cart!
        </Alert>
      </Snackbar>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  products: state?.Post || {},
});

const mapDispatchToProps = (dispatch) => ({
  getPost: () => dispatch(getPost()),
  addToCart: (product) => dispatch(addToCart(product)),
  removeFromCart: (product) => dispatch(removeFromCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
