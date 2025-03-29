import React from "react";
import Slider from "react-slick";
import { Card, CardMedia, Box, Container } from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://img.freepik.com/premium-psd/smart-phone-sale-promotion-black-friday-sale-web-banner-template_179771-192.jpg",
  "https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-2158.jpg",
  "https://img.freepik.com/premium-psd/gaming-laptop-sale-promotion-banner_252779-743.jpg",
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 500,marginLeft:"00px", mt: 3, borderRadius: 2, overflow: "hidden" }}>
        <Slider {...settings}>
          {images.map((img, index) => (
            <Card key={index}>
              <CardMedia component="img" height="300" image={img} alt={`Slide ${index + 1}`} />
            </Card>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default Carousel;
