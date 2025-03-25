import { connect } from "react-redux";
import { getPost } from "./redux/action/action";
import { useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";

function App({ products, getPost }) {
  useEffect(() => {
    getPost();
  }, [getPost]);

  console.log("Products Data:", products); // Debugging

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Product List
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </Typography>
                <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                  Price: ${product.price} | Discount: {product.discount}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {product.brand} | Model: {product.model}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Color: {product.color} | Category: {product.category}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" sx={{ m: 2 }}>
                Buy Now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  console.log("Redux Full State:", state); // Debugging state structure

  return {
    products: Array.isArray(state?.Post?.products) ? state.Post.products : [], // ✅ Ensure products is always an array
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: () => dispatch(getPost()), // ✅ Fixed incorrect function call
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
