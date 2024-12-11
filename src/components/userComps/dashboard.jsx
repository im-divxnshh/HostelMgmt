import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "../../assets/images/image4.jpg";
import Image1 from "../../assets/images/images5.jpg";
import Image2 from "../../assets/images/kcmt image2.jpg";
import Image3 from "../../assets/images/kcmt image3.jpg"
const Dashboard = () => {
  // Array of image paths
  const images = [
    Image,
    Image1,
    Image2,
    Image3,
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="dashboard-container">
      <div className="slider-container">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>

      <style>
        {`
          .dashboard-container {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
          }

          .slider-container {
            margin: 20px auto;
          }

          .slick-dots li button:before {
            color: #333;
          }

          .slick-dots li.slick-active button:before {
            color: #007bff;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
