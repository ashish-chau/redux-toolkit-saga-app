import { connect } from "react-redux";
import { getPost } from "../redux/action/action";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

function Products({ products, getPost, searchQuery, selectedCategory }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ Fetch products from API
  useEffect(() => {
    getPost();
  }, [getPost]);

  // ✅ Apply filters when products or filters change
  useEffect(() => {
    if (products?.data?.products) {
      let filtered = products.data.products;

      // ✅ Apply Category Filter (Ignore if "All")
      if (selectedCategory !== "All") {
        filtered = filtered.filter(
          (product) => product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // ✅ Apply Search Filter
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    }
  }, [products, searchQuery, selectedCategory]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Product List
      </Typography>
      {filteredProducts.map((product) => (
        <div
          key={product.id}
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
          }}
        >
          {/* ✅ Image Inside Card */}
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

          {/* ✅ Product Details Below Card */}
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

            <p style={{ fontSize: "14px", color: "#555", margin: "5px 0" }}>
              Price: <b>${product.price}</b>
            </p>

            <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "5px" }}>
              <button
                style={{
                  background: "#ff5722",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Buy Now
              </button>
              <button
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  products: state?.Post || {},
});

const mapDispatchToProps = (dispatch) => ({
  getPost: () => dispatch(getPost()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
